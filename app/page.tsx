import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// Force dynamic rendering - no static caching
export const dynamic = 'force-dynamic'
export const runtime = 'edge'
export const revalidate = 0

async function getProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, title, price, compare_at_price, image_url, images, category, is_live')
    .eq('is_live', true)
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return products || []
}

export default async function Home() {
  // Real-time data from Supabase
  const products = await getProducts()

  return (
    <div className="min-h-screen relative selection:bg-[#ccff00] selection:text-black">
      {/* Noise Filter Overlay */}
      <div className="bg-noise"></div>

      {/* --- TOP MARQUEE (The "Hype" Ticker) --- */}
      <div className="bg-[#ccff00] text-black py-2 overflow-hidden border-b-2 border-white z-50 relative">
        <div className="animate-marquee whitespace-nowrap font-heading text-sm md:text-base tracking-widest">
          FREE SHIPPING PREPAID ORDERS • PAN INDIA DELIVERY • HEAVYWEIGHT COTTON 240GSM • NO RESTOCKS ON SOLD OUT ITEMS •
          FREE SHIPPING PREPAID ORDERS • PAN INDIA DELIVERY • HEAVYWEIGHT COTTON 240GSM • NO RESTOCKS ON SOLD OUT ITEMS •
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* --- HERO SECTION (The "Sticker Wall" Vibe) --- */}
      <header className="relative w-full pt-10 pb-20 px-4 overflow-hidden border-b border-white/20">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Typography Chaos */}
          <div className="relative z-10">
            <div className="inline-block bg-white text-black px-3 py-1 font-bold text-xs transform -rotate-2 mb-4">
              ★ DROP #004 LIVE
            </div>
            <h1 className="font-heading text-7xl md:text-9xl leading-[0.9] mb-6">
              WE DON'T <br/>
              <span className="text-stroke">FOLLOW</span> <br/>
              TRENDS.
            </h1>
            <p className="font-doodle text-xl md:text-2xl text-gray-400 rotate-1 mb-8 max-w-md">
              "We create the chaos you want to wear. 100% Cotton. 0% Bullsh*t."
            </p>
            <Link href="#products" className="inline-block bg-[#ccff00] text-black font-heading text-xl px-10 py-4 btn-glitch border-2 border-white hover:bg-white transition-colors">
              SHOP THE DROP
            </Link>
          </div>

          {/* Right: Visual Imagery */}
          <div className="relative h-[400px] md:h-[600px] w-full bg-gray-900 border-2 border-white transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
             <Image 
               src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop"
               alt="Hero"
               fill
               className="object-cover opacity-80"
             />
             {/* Sticker Overlay */}
             <div className="absolute top-4 right-4 bg-pink-500 text-white rounded-full p-4 font-heading text-sm text-center transform rotate-12 animate-pulse">
               NEW <br/> ARRIVAL
             </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[120px] rounded-full -z-10"></div>
      </header>


      {/* --- PRODUCT GRID (The "Street Corner") --- */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-4">
          <h2 className="font-heading text-4xl md:text-6xl">
            LATEST <span className="text-[#ccff00]">HEAT</span>
          </h2>
          <span className="font-mono text-xs md:text-sm text-gray-500">
            [ UPDATED: LIVE ]
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group relative">
                
                {/* Image Card */}
                <div className="relative aspect-[3/4] bg-gray-900 border border-white/20 overflow-hidden mb-3">
                  
                  {/* Category Tag */}
                  {product.category && (
                    <span className="absolute top-2 left-2 bg-pink-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 z-20 uppercase">
                      {product.category}
                    </span>
                  )}

                  {product.image_url ? (
                    <Image 
                      src={product.image_url}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      NO IMAGE
                    </div>
                  )}

                  {/* Hover Add to Cart */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <button className="bg-white text-black font-heading px-6 py-2 hover:bg-[#ccff00] transition-colors">
                      QUICK ADD +
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-bold text-sm md:text-lg uppercase leading-tight group-hover:text-[#ccff00] transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex gap-2 items-center mt-1">
                    {product.compare_at_price && product.compare_at_price > product.price && (
                      <span className="font-mono text-gray-500 text-xs line-through">
                        ₹{product.compare_at_price}
                      </span>
                    )}
                    <span className="font-bold text-white">₹{product.price}</span>
                  </div>
                </div>

              </Link>
            ))
          ) : (
            <div className="col-span-2 md:col-span-4 text-center py-20">
              <p className="text-gray-500 text-lg">No products available yet. Check back soon!</p>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/products" className="inline-block border border-white text-white px-12 py-3 font-heading tracking-widest hover:bg-white hover:text-black transition-all">
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </section>


      {/* --- TRUST BADGES (Engineering Trust) --- */}
      <section className="border-y border-white/20 bg-[#111]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {[
            { title: "240 GSM", sub: "Heavyweight Cotton" },
            { title: "PUFF PRINT", sub: "High Density" },
            { title: "OVERSIZED", sub: "Boxy Fit" },
            { title: "MADE IN INDIA", sub: "Support Local" },
          ].map((item, i) => (
             <div key={i} className="p-6 text-center">
               <h4 className="font-heading text-xl text-[#ccff00] mb-1">{item.title}</h4>
               <p className="font-mono text-xs text-gray-400">{item.sub}</p>
             </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
}
