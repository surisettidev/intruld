export const runtime = 'edge';

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { useCartStore } from '@/lib/cart-store'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Product {
  id: string
  title: string
  price: number
  original_price: number
  image_url: string
  category: string
  stock: number
  sku: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
      stock: product.stock,
      size: 'L'
    })
    alert(`ADDED ${product.title.toUpperCase()} TO BAG`)
  }

  return (
    <div className="min-h-screen relative bg-[#050505] text-white font-sans selection:bg-[#ccff00] selection:text-black">
      {/* Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <Navbar />

      {/* Hero Section */}
      <header className="relative border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-8 md:p-20 flex flex-col justify-center relative z-10 bg-[#050505]">
             <div className="inline-block border border-[#ccff00] text-[#ccff00] text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-6 w-max">
               Drop #004 Live Now
             </div>
             <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-8 tracking-tighter">
               WEAR THE <br/>
               <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>CHAOS.</span>
             </h1>
             <p className="text-gray-400 text-sm md:text-lg max-w-md leading-relaxed mb-8 font-mono">
               Premium heavyweight cotton. Puff prints. Oversized fits. <br/>
               Engineered in India for the global stage.
             </p>
             <button onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} 
                     className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-[#ccff00] hover:scale-105 transition-all w-max">
               Explore Collection
             </button>
          </div>
          <div className="relative h-[50vh] md:h-auto border-t md:border-t-0 md:border-l border-white/10 group overflow-hidden">
             <Image 
               src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop"
               alt="Hero"
               fill
               className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
               priority
             />
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <section id="shop" className="max-w-7xl mx-auto py-20 px-4 relative z-10">
        <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Latest <span className="text-[#ccff00]">Heat</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="aspect-[3/4] bg-gray-900/50 rounded-sm"></div>)}
          </div>
        ) : (
