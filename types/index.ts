export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  variants: Variant[];
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface Variant {
  type: "color" | "storage" | "size";
  label: string;
  value: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  gradient: [string, string];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

export type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating"
  | "discount";
