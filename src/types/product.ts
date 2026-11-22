export type Rating = {
  rate: number;
  count: number;
};
export type Category = {
  _id: string;
  name: string;
  isActive?: boolean;
};
export type ProductForm = {
  description: string;
  brand: string;
  discount: string;
  images: string;
  isFeatured: boolean;
  isActive: boolean;
  title: string;
  price: string;
  stock: string;
  image: string;
  category: string;
};

export type ProductWriteRequest = {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand?: string;
  discount?: number;
  image?: string;
  images?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
};
export type Product = {
  inventoryStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  discount?: number;
  priceAfterDiscount?: number;
  brand?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  sold?: number;
  _id: string;
  title: string;
  price: number;
  stock: number;
  category: Category | string | null;
  image?: string;
  images: string[];
  description: string;
  rating: Rating;
  createdAt: string;
};
export type CartItem = Product & {
  quantity: number;
};
export type CartItemFromAPI = {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
};
export type CartResponse = {
  _id: string;
  user: string;
  items: CartItemFromAPI[];
  createdAt: string;
  updatedAt: string;
};
export type ProductsResponse = {
  data: Product[];
  meta: {
    lowStockThreshold?: number;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
export type ProductProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
};
