import { useStore } from "../context/StoreContext";

export default function Header({ onAdmin }: { onAdmin: () => void }) {
  const { shippingBar, cart } = useStore();
  const count = cart.reduce((s, x) => s + x.qty, 0);
  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* top bar - high-end as per image */}
      <div className="bg-[#4a5a3a] text-white text-xs flex items-center justify-between px-4 py-1.5">
        <span className="hidden md:inline">🚚 Darmowa dostawa od 300 zł</span>
        <span className="hidden md:inline">✦ Szyte w Polsce — małe serie</span>
        <span className="hidden sm:inline">◆ Sprzęt, który ma swoje miejsce</span>
        <span className="ml-auto">Kontakt: sklep@whip-sport.pl | {shippingBar}</span>
      </div>
      <div className="bg-zinc-900 text-white text-[11px] text-center py-1 px-2 tracking-wide">
        Sprzedaż prowadzona wyłącznie online. Nie prowadzimy sklepu stacjonarnego.
      </div>
      {/* main bar - high-end as per image */}
      <div className="border-b border-zinc-200/70 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/insta-logo.jpg" alt="WHIP-SPORT.PL" className="w-10 h-10 rounded-lg shadow-sm ring-1 ring-zinc-200 object-cover" onError={(e)=>{ (e.target as HTMLImageElement).src='/logo-whip-sport.svg'; }} />
            <div>
              <div className="font-bold leading-none tracking-tight">WHIP-SPORT.PL</div>
              <div className="text-[10px] tracking-widest uppercase text-zinc-500 font-semibold">PRACOWNIA SPRZĘTU • OD 2015</div>
            </div>
          </div>
          <nav className="hidden lg:flex gap-6 ml-10 text-sm font-semibold tracking-wide">
            <a href="#offer" className="hover:text-brand">OFERTA</a>
            <a href="#news" className="hover:text-brand">NOWOŚCI</a>
            <a href="#workshop" className="hover:text-brand">WARSZTAT</a>
            <a href="#about" className="hover:text-brand">O NAS</a>
            <a href="#contact" className="hover:text-brand">KONTAKT</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-zinc-50 border rounded-full px-3 py-1.5">
              <span className="text-zinc-400">⌕</span>
              <input placeholder="Szukaj produktów..." className="bg-transparent outline-none text-sm w-32 placeholder:text-zinc-400" />
            </div>
            <a href="#" className="hidden sm:flex flex-col items-center text-xs leading-none gap-1 hover:text-brand"><span className="w-6 h-6 rounded-full border grid place-items-center">◯</span>Konto</a>
            <button onClick={onAdmin} className="flex flex-col items-center text-xs leading-none gap-1 hover:text-brand">
              <span className="relative w-6 h-6 rounded-full border grid place-items-center">🛒<span className="absolute -top-1.5 -right-1.5 bg-brand text-white text-[10px] w-4 h-4 rounded-full grid place-items-center">{count}</span></span> Koszyk
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
