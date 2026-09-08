import { useStore } from "../context/StoreContext";

export default function Header({ onAdmin }: { onAdmin: () => void }) {
  const { shippingBar, cart } = useStore();
  const count = cart.reduce((s, x) => s + x.qty, 0);
  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* mandatory notice */}
      <div className="bg-zinc-900 text-white text-xs text-center py-2 px-2">
        Sprzedaż prowadzona wyłącznie online. Nie prowadzimy sklepu stacjonarnego.
      </div>
      {/* top thin shipping bar info - colorful */}
      <div className="bg-gradient-to-r from-amber-100 via-brand-light to-teal-50 border-b border-amber-200 text-zinc-800 text-sm text-center py-2.5 px-3 flex items-center justify-center gap-2">
        <span className="hidden sm:inline">🚚</span> {shippingBar} <span className="hidden sm:inline text-brand font-semibold">• IRR • Pasamon • ITW Nexus</span>
      </div>
      {/* main bar - high-end */}
      <div className="border-b border-zinc-200/70 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-[1280px] mx-auto px-4 py-3.5 flex items-center gap-5">
          <div className="flex items-center gap-3.5">
            <img src="/insta-logo.jpg" alt="WHIP-SPORT.PL" className="w-11 h-11 rounded-xl shadow-sm ring-1 ring-zinc-200 object-cover" onError={(e)=>{ (e.target as HTMLImageElement).src='/logo-whip-sport.svg'; }} />
            <div>
              <div className="font-bold leading-none tracking-tight text-[15px]">WHIP-SPORT.PL</div>
              <div className="text-[11px] tracking-wide uppercase text-zinc-500 font-medium">Tarnowskie Góry • Sklep Taktyczny • Manufaktura</div>
            </div>
          </div>
          <nav className="hidden lg:flex gap-1 ml-8">
            {[
              ["O mnie","#about"],
              ["Nowości","#news"],
              ["Oferta","#offer"],
              ["Kontakt","#contact"],
            ].map(([label,href])=>(
              <a key={label} href={href} className="px-3 py-2 rounded-full text-sm font-medium text-zinc-700 hover:bg-zinc-900 hover:text-white transition">{label}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href="https://www.instagram.com/whip_sport.pl/" target="_blank" className="hidden sm:inline-flex w-8 h-8 rounded-full border bg-white place-items-center justify-center hover:border-zinc-300 transition text-xs">IG</a>
            <a href="https://www.youtube.com/@WhipFightingSportWFS" target="_blank" className="hidden sm:inline-flex w-8 h-8 rounded-full border bg-white place-items-center justify-center hover:border-zinc-300 transition text-xs">YT</a>
            <button onClick={onAdmin} className="relative bg-zinc-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-black transition shadow-sm">Koszyk • {count}</button>
          </div>
        </div>
      </div>
    </header>
  );
}
