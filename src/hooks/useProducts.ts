import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Product, ProductsResponse } from '../types/product';
interface Options {
    search?: string;
    sort?: string;
    category?: string;
    limit?: number;
    featured?: boolean;
    visibility?: 'active' | 'archived' | 'all';
}
export default function useProducts({ search = '', sort = 'latest', category = '', limit = 10, featured, visibility = 'active' }: Options = {}) {
    const key = JSON.stringify([search, sort, category, limit, featured, visibility]);
    const [pagination, setPagination] = useState({ key, page: 1 });
    const page = pagination.key === key ? pagination.page : 1;
    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<ProductsResponse['meta'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [revision, setRevision] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        void (async () => { await Promise.resolve(); if (controller.signal.aborted)
            return; setLoading(true); setError(null); try {
            const { data } = await api.get<ProductsResponse>('/api/products', { params: { page, limit, search, sort, category, visibility, ...(featured === undefined ? {} : { featured: String(featured) }) }, signal: controller.signal });
            if (!controller.signal.aborted) {
                setProducts(data.data);
                setMeta(data.meta);
            }
        }
        catch {
            if (!controller.signal.aborted)
                setError('Failed to fetch products');
        }
        finally {
            if (!controller.signal.aborted)
                setLoading(false);
        } })();
        return () => controller.abort();
    }, [page, limit, search, sort, category, featured, visibility, revision]);
    return { products, setProducts, meta, loading, error, page, setPage: (value: number) => setPagination({ key, page: value }), refetch: () => setRevision(value => value + 1) };
}
