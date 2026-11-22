export type Rating = {
  rate: number;
  count: number;
};

export type Category = {
  _id: string;
  name: string;
};

export type ProductForm = {
  title: string;
  price: string;
  stock: string;
  image: string;
  category: string;
};

export type Product = {
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
