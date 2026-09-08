import React, { createContext, useContext, useEffect, useState } from "react";
import type { Announcement, CartItem, Category, Product } from "../types";
import { initialAnnouncements, initialCategories, initialProducts, initialShippingBar } from "../data/initialData";

type StoreState = {
  categories: Category[];
  products: Product[];
  announcements: Announcement[];
  shippingBar: string;
  cart: CartItem[];
  // actions
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  setShippingBar: (s: string) => void;
  addAnnouncement: (a: Announcement) => void;
  updateAnnouncement: (a: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  upsertCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  upsertProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
};

const Ctx = createContext<StoreState | null>(null);

const LS_KEY = "whip-sport-pl-store-v1";

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [shippingBar, setShippingBarState] = useState(initialShippingBar);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) try {
      const p = JSON.parse(raw);
      if (p.categories) setCategories(p.categories);
      if (p.products) setProducts(p.products);
      if (p.announcements) setAnnouncements(p.announcements);
      if (p.shippingBar) setShippingBarState(p.shippingBar);
      if (p.cart) setCart(p.cart);
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ categories, products, announcements, shippingBar, cart }));
  }, [categories, products, announcements, shippingBar, cart]);

  const addToCart = (id: string) => setCart(c => {
    const ex = c.find(x => x.productId === id);
    if (ex) return c.map(x => x.productId === id ? { ...x, qty: x.qty + 1 } : x);
    return [...c, { productId: id, qty: 1 }];
  });
  const removeFromCart = (id: string) => setCart(c => c.filter(x => x.productId !== id));
  const setShippingBar = (s: string) => setShippingBarState(s);
  const addAnnouncement = (a: Announcement) => setAnnouncements(v => [a, ...v]);
  const updateAnnouncement = (a: Announcement) => setAnnouncements(v => v.map(x => x.id === a.id ? a : x));
  const deleteAnnouncement = (id: string) => setAnnouncements(v => v.filter(x => x.id !== id));
  const upsertCategory = (c: Category) => setCategories(v => {
    const i = v.findIndex(x => x.id === c.id);
    if (i >= 0) { const copy = [...v]; copy[i] = c; return copy; }
    return [...v, c];
  });
  const deleteCategory = (id: string) => setCategories(v => v.filter(x => x.id !== id));
  const upsertProduct = (p: Product) => setProducts(v => {
    const i = v.findIndex(x => x.id === p.id);
    if (i >= 0) { const copy = [...v]; copy[i] = p; return copy; }
    return [...v, p];
  });
  const deleteProduct = (id: string) => setProducts(v => v.filter(x => x.id !== id));

  return <Ctx.Provider value={{ categories, products, announcements, shippingBar, cart, addToCart, removeFromCart, setShippingBar, addAnnouncement, updateAnnouncement, deleteAnnouncement, upsertCategory, deleteCategory, upsertProduct, deleteProduct }}>{children}</Ctx.Provider>;
};

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("Store not found");
  return c;
};
