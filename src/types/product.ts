export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  _id: string;
  title: string;
  price: number;
  category: string;
  image: string;
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
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  links: {
    next: string | null;
    prev: string | null;
  };
};

export type ProductProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
};
