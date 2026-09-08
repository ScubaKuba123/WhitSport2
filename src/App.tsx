import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import Jalousie from "./components/Jalousie";
import { useStore } from "./context/StoreContext";
import type { Announcement, Category, Product } from "./types";



function CategorySidebar({ selected, onSelect }: { selected: string | null; onSelect: (id: string | null) => void }) {
  const { categories, products } = useStore();
  return (
    <aside className="border rounded-2xl p-3 bg-white h-fit">
      <div className="font-semibold mb-2">Kategorie</div>
      <button onClick={() => onSelect(null)} className={`w-full text-left px-3 py-2 rounded-xl flex justify-between ${selected === null ? "bg-brand text-white" : "hover:bg-zinc-50"}`}>
        <span>Wszystkie</span><span className="text-xs opacity-60">{products.length}</span>
      </button>
      {categories.map(c => {
        const count = products.filter(p => p.categoryId === c.id).length;
        return (
          <div key={c.id} className="mt-1">
            <button onClick={() => onSelect(c.id)} className={`w-full text-left px-3 py-2 rounded-xl flex justify-between ${selected === c.id ? "bg-brand text-white" : "hover:bg-zinc-50"}`}>
              <span>{c.name}</span><span className="text-xs opacity-60">{count}</span>
            </button>
            {c.subcategories.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {c.subcategories.map(sc => {
                  const scCount = products.filter(p => p.subcategoryId === sc.id).length;
                  return <div key={sc.id} className="text-sm text-zinc-600 flex justify-between px-2 py-1"><span>— {sc.name}</span><span className="text-xs">{scCount}</span></div>;
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

function statusStyle(s: string) {
  if (s === "in_stock") return "bg-emerald-600 text-white";
  if (s === "low_stock") return "bg-amber-500 text-white";
  if (s === "made_to_order") return "bg-sky-600 text-white";
  return "bg-zinc-800 text-white";
}
function camoDot(camo?: string) {
  if (!camo) return "bg-zinc-200";
  if (camo.includes("Ranger")) return "bg-[#3f4f3a]";
  if (camo.includes("Coyote")) return "bg-[#8b5a2b]";
  if (camo.includes("Pantera")) return "bg-[#4a5d3a]";
  if (camo.includes("MultiCam")) return "bg-[#7a6a4b]";
  if (camo.includes("Czarny")) return "bg-black";
  return "bg-zinc-400";
}
function ProductCard({ p, onAdd }: { p: Product; onAdd: () => void }) {
  const statusMap: Record<string, string> = {
    in_stock: "W magazynie",
    low_stock: "Ostatnie sztuki",
    made_to_order: "Szyte na zamówienie 1–2 dni",
    out_of_stock: "Do wyczerpania",
  };
  return (
    <div className="border rounded-2xl overflow-hidden bg-white flex flex-col hover:shadow-lg transition group">
      <div className="relative">
        <img src={p.image} alt={p.name} className="h-56 w-full object-cover group-hover:scale-[1.02] transition" />
        <div className="absolute top-2 left-2 flex gap-1">
          <span className={`text-[11px] px-2 py-1 rounded-full font-medium ${statusStyle(p.status)}`}>{statusMap[p.status]}</span>
          {p.oldPrice && <span className="text-[11px] bg-red-600 text-white px-2 py-1 rounded-full font-bold">PROMO</span>}
        </div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full border-2 border-white shadow" style={{ background: p.camo?.includes("Ranger") ? "#3f4f3a" : p.camo?.includes("Coyote") ? "#8b5a2b" : p.camo?.includes("Pantera") ? "#4a5d3a" : p.camo?.includes("MultiCam") ? "#7a6a4b" : p.camo?.includes("Czarny") ? "#111" : "#0e7a5a" }} title={p.camo} />
      </div>
      <div className="p-3 flex-1 flex flex-col gap-2">
        <div className="text-xs text-zinc-500 flex items-center gap-1"><span className={`w-2 h-2 rounded-full ${camoDot(p.camo)}`} />{p.camo} • {p.fabric}</div>
        <div className="font-semibold leading-tight line-clamp-2">{p.name}</div>
        <div className="text-xs text-zinc-500">stan: {p.stock} • {p.fabric?.includes("IRR") ? "IRR ✓" : ""}</div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold text-brand">{p.price} zł {p.oldPrice && <span className="line-through text-zinc-400 text-sm ml-1">{p.oldPrice} zł</span>}</div>
          <button onClick={onAdd} className="bg-brand text-white px-4 py-2 rounded-full text-sm hover:bg-brand-dark shadow">Do koszyka</button>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ onClose }: { onClose: () => void }) {
  const { shippingBar, setShippingBar, announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, categories, upsertCategory, deleteCategory, products, upsertProduct, deleteProduct } = useStore();
  const [tab, setTab] = useState<"bar" | "ann" | "cat" | "prod">("bar");
  const [newAnn, setNewAnn] = useState<Announcement>({ id: "", date: new Date().toISOString().slice(0,10), title: "", content: "" });
  const [newCat, setNewCat] = useState<Category>({ id: "", name: "", slug: "", subcategories: [] });
  const [newProd, setNewProd] = useState<Product>({ id: "", name: "", categoryId: categories[0]?.id || "", price: 0, stock: 0, status: "in_stock", image: "https://picsum.photos/seed/new/600/600", description: "" });

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex">
      <div className="ml-auto w-[720px] max-w-full bg-white h-full overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-lg">Panel administratora</div>
          <button onClick={onClose} className="border px-3 py-1 rounded-full">Zamknij</button>
        </div>
        <div className="flex gap-2 mb-4 text-sm">
          {["bar","ann","cat","prod"].map(k => (
            <button key={k} onClick={() => setTab(k as any)} className={`px-3 py-1 rounded-full border ${tab===k?"bg-zinc-900 text-white":"bg-white"}`}>{k==="bar"?"Pasek wysyłki":k==="ann"?"Ogłoszenia":k==="cat"?"Kategorie":"Produkty"}</button>
          ))}
        </div>

        {tab==="bar" && (
          <div className="space-y-3">
            <div className="text-sm text-zinc-600">Edytuj grubszy pasek pod top barem (widoczny najświeższy komunikat):</div>
            <input value={shippingBar} onChange={e=>setShippingBar(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
            <div className="text-xs text-zinc-500">np. „Wysyłki są obsługiwane przez siedem dni w tygodniu oprócz 23-26 kwiecio-maja”</div>
          </div>
        )}

        {tab==="ann" && (
          <div className="space-y-4">
            <div className="border rounded-xl p-3 space-y-2">
              <div className="font-semibold text-sm">Dodaj ogłoszenie</div>
              <input placeholder="Tytuł" value={newAnn.title} onChange={e=>setNewAnn({...newAnn, title:e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              <input type="date" value={newAnn.date} onChange={e=>setNewAnn({...newAnn, date:e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              <textarea placeholder="Treść" value={newAnn.content} onChange={e=>setNewAnn({...newAnn, content:e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              <button onClick={()=>{ if(!newAnn.title) return; addAnnouncement({...newAnn, id: Date.now().toString()}); setNewAnn({ id:"", date:new Date().toISOString().slice(0,10), title:"", content:""}); }} className="bg-brand text-white px-4 py-2 rounded-full text-sm">Dodaj</button>
            </div>
            {announcements.map(a=>(
              <div key={a.id} className="border rounded-xl p-3 space-y-2">
                <input value={a.title} onChange={e=>updateAnnouncement({...a, title:e.target.value})} className="w-full border rounded px-2 py-1 text-sm font-semibold" />
                <input type="date" value={a.date} onChange={e=>updateAnnouncement({...a, date:e.target.value})} className="border rounded px-2 py-1 text-sm" />
                <textarea value={a.content} onChange={e=>updateAnnouncement({...a, content:e.target.value})} className="w-full border rounded px-2 py-1 text-sm" />
                <button onClick={()=>deleteAnnouncement(a.id)} className="text-xs text-red-600 underline">Usuń</button>
              </div>
            ))}
          </div>
        )}

        {tab==="cat" && (
          <div className="space-y-4">
            <div className="border rounded-xl p-3 space-y-2">
              <div className="font-semibold text-sm">Dodaj / edytuj kategorię (id = slug)</div>
              <input placeholder="ID / slug np. plecaki" value={newCat.id} onChange={e=>setNewCat({...newCat, id:e.target.value, slug:e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              <input placeholder="Nazwa" value={newCat.name} onChange={e=>setNewCat({...newCat, name:e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              <button onClick={()=>{ if(!newCat.id||!newCat.name) return; upsertCategory({...newCat, subcategories:[]}); setNewCat({ id:"", name:"", slug:"", subcategories:[]}); }} className="bg-brand text-white px-4 py-2 rounded-full text-sm">Zapisz kategorię</button>
            </div>
            {categories.map(c=>(
              <div key={c.id} className="border rounded-xl p-3 flex justify-between items-center">
                <div><div className="font-semibold text-sm">{c.name}</div><div className="text-xs text-zinc-500">{c.id} • {c.subcategories.length} podkategorii</div></div>
                <button onClick={()=>deleteCategory(c.id)} className="text-xs text-red-600 underline">Usuń</button>
              </div>
            ))}
          </div>
        )}

        {tab==="prod" && (
          <div className="space-y-4">
            <div className="border rounded-xl p-3 space-y-2">
              <div className="font-semibold text-sm">Dodaj / edytuj produkt (ID unikalne)</div>
              <input placeholder="ID" value={newProd.id} onChange={e=>setNewProd({...newProd, id:e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              <input placeholder="Nazwa" value={newProd.name} onChange={e=>setNewProd({...newProd, name:e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              <input placeholder="Cena" type="number" value={newProd.price} onChange={e=>setNewProd({...newProd, price: Number(e.target.value)})} className="w-full border rounded px-3 py-2 text-sm" />
              <select value={newProd.categoryId} onChange={e=>setNewProd({...newProd, categoryId:e.target.value})} className="w-full border rounded px-3 py-2 text-sm">
                {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select value={newProd.status} onChange={e=>setNewProd({...newProd, status:e.target.value as any})} className="w-full border rounded px-3 py-2 text-sm">
                <option value="in_stock">W magazynie</option>
                <option value="low_stock">Ostatnie sztuki</option>
                <option value="made_to_order">Szyte na zamówienie 1–2 dni</option>
                <option value="out_of_stock">Do wyczerpania</option>
              </select>
              <input placeholder="Image URL" value={newProd.image} onChange={e=>setNewProd({...newProd, image:e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              <button onClick={()=>{ if(!newProd.id||!newProd.name) return; upsertProduct({...newProd, description: newProd.description || "Opis", stock: newProd.stock || 0 }); }} className="bg-brand text-white px-4 py-2 rounded-full text-sm">Zapisz produkt</button>
            </div>
            {products.map(p=>(
              <div key={p.id} className="border rounded-xl p-3 flex gap-3">
                <img src={p.image} alt="" className="w-16 h-16 object-cover rounded" />
                <div className="flex-1"><div className="font-semibold text-sm">{p.name}</div><div className="text-xs text-zinc-500">{p.categoryId} • {p.price} zł • {p.status}</div></div>
                <button onClick={()=>deleteProduct(p.id)} className="text-xs text-red-600 underline">Usuń</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuizFinder({ products, onAdd }: { products: Product[]; onAdd: (id: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ use?: string; color?: string; need?: string }>({});
  const filtered = products.filter(p => {
    if (answers.color && p.camo !== answers.color) return false;
    if (answers.need) {
      if (answers.need === "pas" && p.subcategoryId !== "pasy") return false;
      if (answers.need === "kieszen" && p.categoryId !== "oporazdzenie") return false;
      if (answers.need === "panel" && p.subcategoryId !== "panele") return false;
    }
    return true;
  });
  if (step === 3) {
    return (
      <div>
        <div className="bg-gradient-to-r from-brand to-teal-600 text-white rounded-2xl p-4 mb-4">
          <div className="font-bold">Polecane dla Ciebie — {filtered.length} produktów</div>
          <div className="text-sm opacity-80">Na podstawie: {answers.use} • {answers.color || "dowolny kolor"} • {answers.need || "wszystko"}</div>
          <button onClick={() => { setStep(0); setAnswers({}); }} className="mt-2 bg-white text-brand px-3 py-1 rounded-full text-sm">Zacznij od nowa</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => <ProductCard key={p.id} p={p} onAdd={() => onAdd(p.id)} />)}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-xs text-zinc-500 mb-1">Krok {step + 1}/3 — Pomagamy wybrać</div>
      <div className="w-full bg-zinc-100 h-2 rounded-full mb-4"><div className="bg-brand h-2 rounded-full transition-all" style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      {step === 0 && (
        <div>
          <div className="font-bold text-lg mb-3">Co planujesz?</div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { id: "strzelnica", label: "Strzelnica / Służba", desc: "Pas bojowy, ładownice", color: "bg-emerald-50 border-emerald-200" },
              { id: "edc", label: "EDC na co dzień", desc: "Lekkie, kompaktowe", color: "bg-sky-50 border-sky-200" },
              { id: "outdoor", label: "Outdoor / Bushcraft", desc: "Wytrzymałe, IRR", color: "bg-amber-50 border-amber-200" },
              { id: "sport", label: "Bicze sportowe", desc: "Hybrydowe Paracord", color: "bg-zinc-50 border-zinc-200" },
            ].map(o => (
              <button key={o.id} onClick={() => { setAnswers({ ...answers, use: o.id }); setStep(1); }} className={`border-2 rounded-2xl p-4 text-left hover:scale-[1.02] transition ${o.color}`}>
                <div className="font-semibold">{o.label}</div><div className="text-xs text-zinc-600">{o.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 1 && (
        <div>
          <div className="font-bold text-lg mb-3">Jaki kolor/kamuflaż?</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Ranger Green IRR", "Wz.93 Pantera IRR", "MultiCam IRR", "Coyote Brown", "Czarny", ""].map(c => (
              <button key={c || "any"} onClick={() => { setAnswers({ ...answers, color: c || undefined }); setStep(2); }} className={`h-20 rounded-xl border-2 flex items-center justify-center font-semibold ${!c ? "bg-white" : c.includes("Ranger") ? "bg-[#3f4f3a] text-white" : c.includes("Pantera") ? "bg-[#4a5d3a] text-white" : c.includes("MultiCam") ? "bg-[#7a6a4b] text-white" : c.includes("Coyote") ? "bg-[#8b5a2b] text-white" : "bg-zinc-900 text-white"}`}>
                {c || "Dowolny"}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="mt-3 text-sm underline">Wstecz</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="font-bold text-lg mb-3">Czego potrzebujesz?</div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { id: "pas", label: "Pas taktyczny" },
              { id: "kieszen", label: "Kieszeń / Ładownica" },
              { id: "panel", label: "Panel / Dodatki" },
            ].map(o => (
              <button key={o.id} onClick={() => { setAnswers({ ...answers, need: o.id }); setStep(3); }} className="border-2 rounded-2xl p-6 text-center hover:bg-brand-light hover:border-brand transition">
                <div className="font-semibold">{o.label}</div>
              </button>
            ))}
            <button onClick={() => { setAnswers({ ...answers, need: undefined }); setStep(3); }} className="border-2 border-dashed rounded-2xl p-6 text-center">Pokaż wszystko</button>
          </div>
          <button onClick={() => setStep(1)} className="mt-3 text-sm underline">Wstecz</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { announcements, products, categories, addToCart, cart } = useStore();
  const [cat, setCat] = useState<string | null>(null);
  const [admin, setAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [view, setView] = useState<"carousel" | "jalousie" | "quiz">("carousel");
  const [camoFilter, setCamoFilter] = useState<string | null>(null);
  const filtered = cat ? products.filter(p => p.categoryId === cat) : products;
  const cartTotal = cart.reduce((s, ci) => {
    const p = products.find(x => x.id === ci.productId);
    return s + (p ? p.price * ci.qty : 0);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Header onAdmin={() => setAdmin(true)} />
      <main className="max-w-[1280px] mx-auto w-full px-4 py-6 flex-1">
        {/* announcements - vivid but airy */}
        <section id="news" className="mb-6">
          <div className="flex items-center gap-2 mb-3"><div className="w-1 h-5 bg-brand rounded-full" /><div className="font-bold">Ogłoszenia</div><span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">parafialne</span></div>
          <div className="grid md:grid-cols-3 gap-3">
            {announcements.map((a, i) => {
              const accents = ["border-l-amber-500 bg-amber-50/60", "border-l-sky-500 bg-sky-50/60", "border-l-emerald-500 bg-emerald-50/60"];
              return (
                <div key={a.id} className={`bg-white border rounded-2xl p-3.5 border-l-4 shadow-sm hover:shadow-md transition ${accents[i % 3]}`}>
                  <div className="text-xs font-mono text-zinc-500">{a.date}</div>
                  <div className="font-bold text-sm mt-1 leading-tight">{a.title}</div>
                  <div className="text-sm text-zinc-700 mt-1 line-clamp-3">{a.content}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* stylish minimal chooser - vivid but simple */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="bg-white border rounded-full p-1 flex gap-1 shadow-sm">
            <button onClick={() => setView("carousel")} className={`px-5 py-2 rounded-full text-sm font-semibold transition ${view==="carousel" ? "bg-brand text-white shadow" : "text-zinc-600 hover:bg-zinc-50"}`}>Karuzela</button>
            <button onClick={() => setView("jalousie")} className={`px-5 py-2 rounded-full text-sm font-semibold transition ${view==="jalousie" ? "bg-zinc-900 text-white shadow" : "text-zinc-600 hover:bg-zinc-50"}`}>Żaluzje</button>
            <button onClick={() => setView("quiz")} className={`px-5 py-2 rounded-full text-sm font-semibold transition ${view==="quiz" ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow" : "text-sky-700 hover:bg-sky-50"}`}>✦ Kreator</button>
          </div>
          {view !== "quiz" && (
            <div className="ml-auto flex gap-1.5 flex-wrap">
              {["Wszystkie", "Ranger Green IRR", "Pantera IRR", "MultiCam IRR", "Coyote Brown", "Czarny"].map(c => {
                const active = c === "Wszystkie" ? !camoFilter : camoFilter === c;
                const bg = c.includes("Ranger") ? "bg-[#3f4f3a] text-white border-[#3f4f3a]" : c.includes("Pantera") ? "bg-[#4a5d3a] text-white border-[#4a5d3a]" : c.includes("MultiCam") ? "bg-[#7a6a4b] text-white border-[#7a6a4b]" : c.includes("Coyote") ? "bg-[#8b5a2b] text-white border-[#8b5a2b]" : c.includes("Czarny") ? "bg-zinc-900 text-white border-zinc-900" : active ? "bg-brand text-white border-brand" : "bg-white border-zinc-200";
                return <button key={c} onClick={() => setCamoFilter(c === "Wszystkie" ? null : c)} className={`px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm ${bg} hover:scale-[1.02] transition`}>{c}</button>;
              })}
            </div>
          )}
        </div>

        {view === "jalousie" ? (
          <Jalousie categories={categories} products={camoFilter ? products.filter(p => p.camo === camoFilter) : products} onAdd={addToCart} />
        ) : view === "quiz" ? (
          <QuizFinder products={products} onAdd={addToCart} />
        ) : (
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            <CategorySidebar selected={cat} onSelect={setCat} />
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">Produkty {cat ? `— ${cat}` : ""} <span className="text-zinc-500 font-normal">({(camoFilter ? products.filter(p => p.camo === camoFilter) : filtered).length})</span></div>
                <button onClick={() => setShowCart(true)} className="border bg-white px-4 py-2 rounded-full text-sm shadow-sm">Koszyk: {cart.length} • {cartTotal} zł</button>
              </div>
              {(() => { const list = camoFilter ? products.filter(p => p.camo === camoFilter && (!cat || p.categoryId === cat)) : filtered; return list.length === 0 ? <div className="text-sm text-zinc-500 border rounded-xl p-8 text-center bg-white">Brak produktów — zmień filtry.</div> : <Carousel>{list.map(p => <ProductCard key={p.id} p={p} onAdd={() => addToCart(p.id)} />)}</Carousel>; })()}
            </div>
          </div>
        )}
      </main>
      <Footer />
      {admin && <AdminPanel onClose={() => setAdmin(false)} />}
      {showCart && (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-40">
          <div className="w-[420px] max-w-full bg-white h-full p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4"><div className="font-bold">Koszyk</div><button onClick={() => setShowCart(false)} className="border px-3 py-1 rounded-full">Zamknij</button></div>
            {cart.length === 0 ? <div className="text-sm text-zinc-500">Koszyk pusty</div> : (
              <div className="space-y-3">
                {cart.map(ci => {
                  const p = products.find(x => x.id === ci.productId);
                  if (!p) return null;
                  return <div key={ci.productId} className="border rounded-xl p-3 flex gap-3"><img src={p.image} className="w-16 h-16 object-cover rounded" /><div className="flex-1"><div className="font-semibold text-sm">{p.name}</div><div className="text-xs">{ci.qty} × {p.price} zł</div></div></div>;
                })}
                <div className="font-bold">Razem: {cartTotal} zł</div>
                <div className="text-xs text-zinc-600">Dostawa: InPost Paczkomat / Kurier • Płatność: BLIK / przelew / karta / PayPal • Faktura NIP w checkout</div>
                <button className="w-full bg-brand text-white py-3 rounded-full">Przejdź do kasy (gość)</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
