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

interface UseProductsParams {
  search?: string;
  sort?: string;
  category?: string;
}

const useProducts = ({
  search = "",
  sort = "",
  category = "",
}: UseProductsParams = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        sort,
        category,
      });

      const res = await fetch(`${API_URL}/api/products?${params}`);

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
  }, [page, limit, search, sort, category]);

  return {
    products,
    setProducts,
    loading,
    error,
    page,
    setPage,
    meta,
    refetch: fetchProducts,
  };
};

export default useProducts;
