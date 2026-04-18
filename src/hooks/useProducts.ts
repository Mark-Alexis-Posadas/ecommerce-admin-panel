import { useState, useEffect } from "react";
import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/products?page=${page}&limit=${limit}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      setProducts(data.data);
      setMeta(data.meta);
    } catch (error) {
      setError("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  return {
    products,
    setProducts,
    loading,
    error,

    // 🔥 NEW
    page,
    setPage,
    meta,
    refetch: fetchProducts,
  };
};

export default useProducts;
