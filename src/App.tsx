import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import { useStore } from "./context/StoreContext";
import type { Announcement, Category, Product } from "./types";

function Badge({ children }: { children: string }) {
  return <span className="text-xs bg-zinc-900 text-white px-2 py-1 rounded-full">{children}</span>;
}

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

function ProductCard({ p, onAdd }: { p: Product; onAdd: () => void }) {
  const statusMap: Record<string, string> = {
    in_stock: "W magazynie",
    low_stock: "Ostatnie sztuki",
    made_to_order: "Szyte na zamówienie 1–2 dni",
    out_of_stock: "Do wyczerpania",
  };
  return (
    <div className="border rounded-2xl overflow-hidden bg-white flex flex-col">
      <img src={p.image} alt={p.name} className="h-56 w-full object-cover" />
      <div className="p-3 flex-1 flex flex-col gap-2">
        <div className="text-xs text-zinc-500">{p.camo} • {p.fabric}</div>
        <div className="font-semibold leading-tight">{p.name}</div>
        <div className="text-xs"><Badge>{statusMap[p.status]}</Badge> <span className="ml-2 text-zinc-500">stan: {p.stock}</span></div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold">{p.price} zł {p.oldPrice && <span className="line-through text-zinc-400 text-sm ml-1">{p.oldPrice} zł</span>}</div>
          <button onClick={onAdd} className="bg-brand text-white px-4 py-2 rounded-full text-sm hover:bg-brand-dark">Do koszyka</button>
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

export default function App() {
  const { announcements, products, addToCart, cart } = useStore();
  const [cat, setCat] = useState<string | null>(null);
  const [admin, setAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const filtered = cat ? products.filter(p => p.categoryId === cat) : products;
  const cartTotal = cart.reduce((s, ci) => {
    const p = products.find(x => x.id === ci.productId);
    return s + (p ? p.price * ci.qty : 0);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Header onAdmin={() => setAdmin(true)} />
      <main className="max-w-[1280px] mx-auto w-full px-4 py-6 flex-1">
        {/* announcements */}
        <section id="news" className="bg-white border rounded-2xl p-4 mb-6">
          <div className="font-bold mb-3">Ogłoszenia parafialne</div>
          <div className="grid md:grid-cols-3 gap-4">
            {announcements.map(a => (
              <div key={a.id} className="border rounded-xl p-3 bg-amber-50/40">
                <div className="text-xs text-zinc-500">{a.date}</div>
                <div className="font-semibold text-sm">{a.title}</div>
                <div className="text-sm text-zinc-700">{a.content}</div>
              </div>
            ))}
          </div>
        </section>

        {/* main layout variant 1 + 2 */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <CategorySidebar selected={cat} onSelect={setCat} />
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Produkty {cat ? `— ${cat}` : ""} <span className="text-zinc-500 font-normal">({filtered.length})</span></div>
              <button onClick={() => setShowCart(true)} className="border bg-white px-4 py-2 rounded-full text-sm">Koszyk: {cart.length} • {cartTotal} zł</button>
            </div>
            {filtered.length === 0 ? <div className="text-sm text-zinc-500 border rounded-xl p-8 text-center bg-white">Brak produktów w tej kategorii — dodaj w panelu admina.</div> : (
              <Carousel>{filtered.map(p => <ProductCard key={p.id} p={p} onAdd={() => addToCart(p.id)} />)}</Carousel>
            )}
          </div>
        </div>
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
