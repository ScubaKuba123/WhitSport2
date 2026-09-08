export type Category = {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId?: string;
  price: number;
  oldPrice?: number;
  stock: number; // 0 = na zamówienie
  status: 'in_stock' | 'made_to_order' | 'low_stock' | 'out_of_stock';
  camo?: string;
  fabric?: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
};

export type Announcement = {
  id: string;
  date: string; // ISO
  title: string;
  content: string;
};

export type CartItem = {
  productId: string;
  qty: number;
  variant?: string;
};

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'cutting' | 'sewing' | 'ready' | 'shipped';
  tracking?: string;
  customer: { name: string; email: string; nip?: string };
};

export type TopNavItem = { label: string; href: string };
