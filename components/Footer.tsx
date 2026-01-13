import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10 px-6 relative z-10 text-white font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Brand Area */}
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
            Intru<span className="text-[#ccff00]">.</span>in
          </h2>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-mono">
            Designed in India. Built for the streets. <br/>
            No compromises on quality.
          </p>
        </div>

        {/* Links Area */}
        <div className="grid grid-cols-2 gap-12 text-sm uppercase font-bold tracking-widest text-gray-400">
          <div className="flex flex-col gap-4">
            <Link href="/" className="hover:text-[#ccff00] transition-colors">Instagram</Link>
            <Link href="/" className="hover:text-[#ccff00] transition-colors">WhatsApp</Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/" className="hover:text-white transition-colors">Returns</Link>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-20 pt-6 border-t border-white/10 text-center text-[10px] text-gray-600 uppercase tracking-widest">
        © 2026 Intru Clothing. All Rights Reserved.
      </div>
    </footer>
  )
}
