'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'

export function Navbar() {
  // Use a local state to prevent Hydration Mismatch
  const [mounted, setMounted] = useState(false)
  const items = useCartStore((state) => state.items)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0

  return (
    <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center text-white font-sans">
      
      {/* Logo */}
      <Link href="/" className="text-3xl font-black tracking-tighter uppercase leading-none hover:text-[#ccff00] transition-colors">
        INTRU<span className="text-[#ccff00]">.</span>IN
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">Shop All</Link>
        <Link href="/" className="hover:text-white transition-colors">New Drops</Link>
        <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
      </div>

      {/* Cart Button */}
      <Link href="/cart" className="relative group flex items-center gap-2">
        <span className="text-sm font-bold tracking-widest uppercase">BAG</span>
        <span className="bg-[#ccff00] text-black text-xs font-black px-2 py-0.5 rounded-sm">
          {cartCount}
        </span>
      </Link>
    </nav>
  )
}
