import { useState } from "react";
import { useStore } from "../context/StoreContext";

type Hotspot = { id: string; label: string; x: number; y: number; side?: "left" | "right" };

const hotspots: Hotspot[] = [
  { id: "panele", label: "Panele na rzep", x: 52, y: 22 },
  { id: "plecak", label: "Plecak", x: 60, y: 23, side: "right" },
  { id: "oporzadzenie", label: "Oporządzenie taktyczne", x: 41, y: 33 },
  { id: "ladownice", label: "Ładownice", x: 42, y: 43 },
  { id: "kieszenie", label: "Kieszenie", x: 58, y: 43 },
  { id: "worki", label: "Worki zrzutowe", x: 43, y: 51 },
  { id: "pasmanteria", label: "Pasmanteria", x: 60, y: 51, side: "right" },
  { id: "cargo", label: "Cargo", x: 58, y: 64 },
  { id: "edc", label: "EDC", x: 49, y: 72 },
];

const categoryMeta: Record<string, { title: string; desc: string }> = {
  kieszenie: { title: "Kieszenie", desc: "Funkcjonalne kieszenie projektowane do codziennego i terenowego użytkowania." },
  oporzadzenie: { title: "Oporządzenie taktyczne", desc: "Modułowe systemy nośne MOLLE/PALS — szyte w Tarnowskich Górach." },
  ladownice: { title: "Ładownice", desc: "Ładownice karabinowe i pistoletowe — Cordura 500D, IRR." },
  worki: { title: "Worki zrzutowe", desc: "Składane, lekkie — idealne na strzelnicę." },
  pasmanteria: { title: "Pasmanteria", desc: "Taśmy Pasamon, klamry ITW Nexus/Duraflex, rzepy." },
  cargo: { title: "Cargo", desc: "Spodnie i kieszenie cargo — wzmocnione szwy." },
  edc: { title: "EDC", desc: "Drobne akcesoria codziennego użytku." },
  panele: { title: "Panele na rzep", desc: "Administracyjne, 10×15, haft W-S." },
  plecak: { title: "Akcesoria plecakowe", desc: "Troczenie, panele, organizery plecakowe." },
};

const bottomCats = [
  { id: "oporzadzenie", label: "OPORZĄDZENIE TAKTYCZNE", img: "https://images.unsplash.com/photo-1545896381-511289742368?w=300&h=200&fit=crop" },
  { id: "ladownice", label: "ŁADOWNICE", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop" },
  { id: "kieszenie", label: "KIESZENIE", img: "https://images.unsplash.com/photo-1521991467908-2d3a4d65736e?w=300&h=200&fit=crop" },
  { id: "cargo", label: "CARGO", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop" },
  { id: "worki", label: "WORKI ZRZUTOWE", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=200&fit=crop" },
  { id: "panele", label: "PANELE NA RZEP", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=200&fit=crop" },
  { id: "pasmanteria", label: "PASMANTERIA", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop" },
  { id: "edc", label: "EDC", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop" },
  { id: "plecak", label: "AKCESORIA PLECAKOWE", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop" },
];

export default function InteractiveCatalog() {
  const { products } = useStore();
  const [active, setActive] = useState<string>("kieszenie");
  const meta = categoryMeta[active] || categoryMeta.kieszenie;
  const activeProducts = products.filter(p => {
    if (active === "kieszenie") return p.subcategoryId === "ladownice" || p.categoryId === "oporzadzenie";
    if (active === "oporzadzenie") return p.categoryId === "oporzadzenie";
    if (active === "ladownice") return p.subcategoryId === "ladownice";
    if (active === "worki") return p.subcategoryId === "worki";
    if (active === "pasmanteria") return p.categoryId === "pasmanteria";
    if (active === "cargo") return p.subcategoryId === "ladownice";
    if (active === "edc") return p.categoryId === "bicze";
    if (active === "panele") return p.subcategoryId === "panele";
    if (active === "plecak") return p.subcategoryId === "worki";
    return true;
  }).slice(0, 3);
  const count = products.filter(p => {
    if (active === "oporzadzenie") return p.categoryId === "oporzadzenie";
    return true;
  }).length;
  const displayCount = active === "kieszenie" ? 24 : active === "oporzadzenie" ? 18 : count;

  return (
    <div className="bg-[#f6f7f5] rounded-3xl overflow-hidden border shadow-sm">
      <div className="relative grid lg:grid-cols-[380px_1fr_380px] min-h-[520px]">
        {/* left copy */}
        <div className="p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-[#f6f7f5] to-white">
          <div className="text-[11px] tracking-[0.2em] text-[#4a5a3a] font-semibold">INTERAKTYWNY KATALOG SPRZĘTU</div>
          <h2 className="text-4xl leading-none mt-3" style={{ fontFamily: "Playfair Display, serif" }}>
            SPRZĘT,<br /><span className="text-[#4a5a3a] italic font-normal">KTÓRY MA</span><br />SWOJE MIEJSCE.
          </h2>
          <p className="text-sm text-zinc-600 mt-4 max-w-[320px]">Poznaj ofertę WHIP-SPORT.PL bez szukania po menu. Kliknij element wyposażenia, aby przejść do kategorii.</p>
          <div className="flex flex-col gap-2 mt-6">
            <button onClick={() => document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})} className="bg-[#2f3d26] text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-black transition text-left">ODKRYJ WYPOSAŻENIE →</button>
            <button onClick={() => document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})} className="bg-white border rounded-full px-6 py-3 text-sm font-medium hover:bg-zinc-50 transition text-left">ZOBACZ CAŁĄ OFERTĘ →</button>
          </div>
          <div className="flex gap-6 mt-8 text-xs">
            <div><div className="font-bold flex items-center gap-1">⬢ Polska produkcja</div><div className="text-zinc-500">Małe serie</div></div>
            <div><div className="font-bold flex items-center gap-1">⚙ Sprawdzona funkcjonalność</div><div className="text-zinc-500">Testowane w terenie</div></div>
            <div><div className="font-bold flex items-center gap-1">◆ Wytrzymałe materiały</div><div className="text-zinc-500">Cordura® i inne</div></div>
          </div>
        </div>

        {/* center soldier - high-end */}
        <div className="relative bg-[#dbe6d5] overflow-hidden flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1509244623621-b8a83e094323?w=800&h=900&fit=crop&q=80" alt="soldier" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5" />
          {/* hotspots */}
          {hotspots.map(h => (
            <button
              key={h.id}
              onClick={() => setActive(h.id)}
              className={`absolute flex items-center gap-1.5 ${h.side === "right" ? "flex-row-reverse" : ""} group`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span className={`w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center shadow ${active === h.id ? "border-[#4a5a3a] bg-[#4a5a3a] text-white" : "border-white"}`}>
                <span className={`w-3 h-3 rounded-full ${active === h.id ? "bg-white" : "bg-zinc-400 group-hover:bg-brand"}`} />
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shadow backdrop-blur ${active === h.id ? "bg-[#2f3d26] text-white" : "bg-zinc-900/80 text-white"}`}>{h.label}</span>
            </button>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur whitespace-nowrap">↕ Przeciągnij, aby obrócić • Scroll, aby przybliżyć</div>
        </div>

        {/* right panel */}
        <div className="bg-white p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-[11px] tracking-widest text-zinc-500">KATEGORIA</div>
            <span className="w-6 h-6 rounded-full border grid place-items-center text-xs">✕</span>
          </div>
          <div className="font-bold text-2xl mt-1" style={{ fontFamily: "Playfair Display, serif" }}>{meta.title}</div>
          <div className="text-xs text-zinc-500 mt-1">{meta.desc}</div>
          <div className="text-xs font-semibold mt-3">{displayCount} produkty</div>
          <div className="flex-1 flex items-center justify-center my-4">
            <img src={activeProducts[0]?.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"} alt={meta.title} className="w-40 h-40 object-contain drop-shadow-xl" />
          </div>
          <div className="text-[11px] tracking-widest text-zinc-500 font-semibold">POPULARNE PRODUKTY</div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {(activeProducts.length ? activeProducts : products.slice(0,3)).map(p => (
              <div key={p.id} className="border rounded-xl p-2 bg-zinc-50">
                <img src={p.image} alt={p.name} className="w-full h-20 object-cover rounded-lg" />
                <div className="text-xs font-medium leading-tight mt-1 line-clamp-2">{p.name}</div>
                <div className="text-[10px] text-zinc-500">{p.camo}</div>
                <div className="text-xs font-bold mt-1">{p.price} zł</div>
              </div>
            ))}
          </div>
          <button onClick={() => document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})} className="mt-4 bg-[#2f3d26] text-white rounded-full py-3 text-sm font-semibold hover:bg-black transition">ZOBACZ WSZYSTKIE {meta.title.toUpperCase()} →</button>
        </div>
      </div>

      {/* bottom thumbnails */}
      <div className="grid grid-cols-3 md:grid-cols-9 gap-1 p-1 bg-zinc-900">
        {bottomCats.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)} className={`relative h-28 overflow-hidden rounded-xl group ${active === c.id ? "ring-2 ring-white" : "opacity-90 hover:opacity-100"}`}>
            <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-105 transition" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white text-[10px] font-bold leading-tight">{c.label} <span className="block font-normal opacity-80">→</span></div>
          </button>
        ))}
      </div>
    </div>
  );
}
