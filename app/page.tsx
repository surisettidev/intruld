import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  // Real Intru Vibe Data
  const products = [
    { 
      id: 1, 
      name: 'Doodles Heavy Tee', 
      price: 999, 
      originalPrice: 1499,
      img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
      tag: 'PUFF PRINT',
      color: 'bg-pink-500' // Tag color
    },
    { 
      id: 2, 
      name: 'No Risk No Rari', 
      price: 1199, 
      originalPrice: 1999,
      img: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop',
      tag: 'BESTSELLER',
      color: 'bg-green-500'
    },
    { 
      id: 3, 
      name: 'Varsity Jacket 001', 
      price: 2499, 
      originalPrice: 3999,
      img: 'https://images.unsplash.com/photo-1551488852-0801751ac7eb?q=80&w=800&auto=format&fit=crop',
      tag: 'WINTER DROP',
      color: 'bg-blue-600'
    },
    { 
      id: 4, 
      name: 'Acid Wash Cargo', 
      price: 1899, 
      originalPrice: 2499,
      img: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop',
      tag: 'LIMITED',
      color: 'bg-red-600'
    },
  ]

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

      {/* --- NAVIGATION (Mobile First) --- */}
      <nav className="p-4 md:p-6 flex justify-between items-center relative z-40 bg-black/80 backdrop-blur-md sticky top-0 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Hamburger Icon */}
          <div className="md:hidden space-y-1 cursor-pointer">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-4 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
          <Link href="/" className="font-heading text-3xl md:text-4xl tracking-tighter hover:text-[#ccff00] transition-colors">
            INTRU<span className="text-[#ccff00]">®</span>
          </Link>
        </div>

        <div className="hidden md:flex gap-8 font-heading text-sm tracking-widest">
          <Link href="/" className="hover:text-[#ccff00] transition-colors">SHOP ALL</Link>
          <Link href="/" className="hover:text-[#ccff00] transition-colors">OVERSIZED TEES</Link>
          <Link href="/" className="hover:text-[#ccff00] transition-colors">CARGOS</Link>
        </div>

        <Link href="/cart" className="relative group">
          <span className="font-heading text-xl">BAG (0)</span>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ccff00] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </Link>
      </nav>

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
            <button className="bg-[#ccff00] text-black font-heading text-xl px-10 py-4 btn-glitch border-2 border-white">
              SHOP THE DROP
            </button>
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
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-4">
          <h2 className="font-heading text-4xl md:text-6xl">
            LATEST <span className="text-[#ccff00]">HEAT</span>
          </h2>
          <span className="font-mono text-xs md:text-sm text-gray-500">
            [ UPDATED: TODAY ]
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              
              {/* Image Card */}
              <div className="relative aspect-[3/4] bg-gray-900 border border-white/20 overflow-hidden mb-3">
                
                {/* Tag */}
                <span className={`absolute top-2 left-2 ${product.color} text-white text-[10px] md:text-xs font-bold px-2 py-1 z-20`}>
                  {product.tag}
                </span>

                <Image 
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Hover Add to Cart (Mobile: Always visible button below, Desktop: Hover) */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <button className="bg-white text-black font-heading px-6 py-2 hover:bg-[#ccff00] transition-colors">
                    QUICK ADD +
                  </button>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-bold text-sm md:text-lg uppercase leading-tight group-hover:text-[#ccff00] transition-colors">
                  {product.name}
                </h3>
                <div className="flex gap-2 items-center mt-1">
                  <span className="font-mono text-gray-500 text-xs line-through">₹{product.originalPrice}</span>
                  <span className="font-bold text-white">₹{product.price}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="border border-white text-white px-12 py-3 font-heading tracking-widest hover:bg-white hover:text-black transition-all">
            VIEW ALL PRODUCTS
          </button>
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


      {/* --- FOOTER --- */}
      <footer className="pt-20 pb-10 px-4 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <h2 className="font-heading text-6xl md:text-8xl text-white leading-none">
              INTRU<span className="text-gray-800">.IN</span>
            </h2>
            <p className="font-doodle text-gray-500 mt-4 text-lg">
              "Wear your intrusive thoughts."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 font-mono text-sm text-gray-400">
             <div className="flex flex-col gap-4">
               <span className="text-white font-bold uppercase">Socials</span>
               <a href="#" className="hover:text-[#ccff00]">Instagram ↗</a>
               <a href="#" className="hover:text-[#ccff00]">WhatsApp ↗</a>
             </div>
             <div className="flex flex-col gap-4">
               <span className="text-white font-bold uppercase">Legal</span>
               <a href="#" className="hover:text-white">Privacy</a>
               <a href="#" className="hover:text-white">Terms</a>
             </div>
          </div>
        </div>
        
        <div className="text-center mt-20 pt-10 border-t border-dashed border-white/20 font-mono text-xs text-gray-600">
          © 2024 INTRU CLOTHING INDIA. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </div>
  )
}