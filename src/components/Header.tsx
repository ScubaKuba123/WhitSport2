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
      {/* top thin shipping bar info */}
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-sm text-center py-2 px-3">
        {shippingBar}
      </div>
      {/* main bar */}
      <div className="border-b border-zinc-200">
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand text-white grid place-items-center font-bold">W-S</div>
            <div>
              <div className="font-bold leading-none">WHIP-SPORT.PL</div>
              <div className="text-xs text-zinc-500">Tarnowskie Góry • Pracownia taktyczna</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-4 ml-6 text-sm">
            <a href="#about" className="hover:text-brand">O mnie</a>
            <a href="#news" className="hover:text-brand">Nowości</a>
            <a href="#promo" className="hover:text-brand">Promocje</a>
            <a href="#contact" className="hover:text-brand">Kontakt</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <a href="https://www.instagram.com/whip_sport.pl/" target="_blank" className="text-xs underline">Instagram</a>
            <a href="https://www.youtube.com/@WhipFightingSportWFS" target="_blank" className="text-xs underline">YouTube</a>
            <button onClick={onAdmin} className="relative border rounded-full px-4 py-2 text-sm hover:bg-zinc-50">Koszyk • {count}</button>
          </div>
        </div>
      </div>
    </header>
  );
}
