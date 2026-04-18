import { useState, useEffect } from "react";
import type { Product } from "../types/product";
const API_URL = import.meta.env.VITE_API_URL;

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data: Product[] = await res.json();
        setProducts(data.data);
      } catch (error) {
        setError("Failed to fetch products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, setProducts, loading, error };
};

export default useProducts;
