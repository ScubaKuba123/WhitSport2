import { useState } from "react";
import type { Category, Product } from "../types";

function JalousieCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="border rounded-xl bg-white overflow-hidden flex flex-col">
      <img src={product.image} alt={product.name} className="h-36 w-full object-cover" />
      <div className="p-2 flex-1 flex flex-col">
        <div className="text-xs text-zinc-500 truncate">{product.camo}</div>
        <div className="text-sm font-semibold leading-tight truncate">{product.name}</div>
        <div className="text-xs mt-1"><span className="bg-zinc-900 text-white px-2 py-0.5 rounded-full text-[10px]">{product.status === "in_stock" ? "W magazynie" : product.status === "low_stock" ? "Ostatnie sztuki" : product.status === "made_to_order" ? "Na zamówienie" : "Do wyczerpania"}</span></div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="font-bold text-sm">{product.price} zł</div>
          <button onClick={onAdd} className="bg-brand text-white px-3 py-1 rounded-full text-xs">+ Koszyk</button>
        </div>
      </div>
    </div>
  );
}

export default function Jalousie({ categories, products, onAdd }: { categories: Category[]; products: Product[]; onAdd: (id: string) => void }) {
  const [open, setOpen] = useState<string | null>(categories[0]?.id ?? null);
  return (
    <div className="space-y-2">
      {categories.map((cat, idx) => {
        const count = products.filter(p => p.categoryId === cat.id).length;
        const isOpen = open === cat.id;
        const catProducts = products.filter(p => p.categoryId === cat.id);
        return (
          <div key={cat.id} className="border rounded-2xl overflow-hidden bg-white shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: isOpen ? "#0e7a5a" : "#e5e7eb" }}>
            <button onClick={() => setOpen(isOpen ? null : cat.id)} className={`w-full flex items-center justify-between px-4 py-3 text-left ${isOpen ? "bg-brand-light" : "bg-white"} hover:bg-zinc-50 transition`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg grid place-items-center text-sm font-bold ${isOpen ? "bg-brand text-white" : "bg-zinc-100"}`}>{idx + 1}</div>
                <div>
                  <div className="font-semibold text-sm">{cat.name}</div>
                  <div className="text-xs text-zinc-500">{cat.subcategories.map(s => s.name).join(" • ") || "—"}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isOpen ? "bg-brand text-white" : "bg-zinc-900 text-white"}`}>{count}</span>
                <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
              </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="p-3 bg-zinc-50 border-t">
                  {catProducts.length === 0 ? (
                    <div className="text-sm text-zinc-500 text-center py-6">Brak produktów — dodaj w adminie.</div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {catProducts.map(p => <JalousieCard key={p.id} product={p} onAdd={() => onAdd(p.id)} />)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* wszystkie */}
      <div className="border rounded-2xl overflow-hidden bg-white">
        <button onClick={() => setOpen(open === "__all" ? null : "__all")} className={`w-full flex items-center justify-between px-4 py-3 ${open === "__all" ? "bg-brand-light" : ""}`}>
          <div className="font-semibold text-sm">Wszystkie produkty</div>
          <span className="text-xs bg-zinc-900 text-white px-2.5 py-1 rounded-full">{products.length}</span>
        </button>
        <div className={`grid transition-all ${open === "__all" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="p-3 bg-zinc-50 border-t grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {products.map(p => <JalousieCard key={p.id} product={p} onAdd={() => onAdd(p.id)} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
