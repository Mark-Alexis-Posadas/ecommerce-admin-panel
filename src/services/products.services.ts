import { api } from './api.ts';
import type { ProductWriteRequest } from '../types/product';

// GET PRODUCTS
export const getProducts = (params?: {
  search?: string;
  sort?: string;
  category?: string;
  page?: number;
}) => {
  return api.get('/api/products', { params });
};

// CREATE PRODUCT
export const createProduct = (data: ProductWriteRequest) => {
  return api.post('/api/products', data);
};

// UPDATE PRODUCT
export const updateProduct = (id: string, data: Partial<ProductWriteRequest>) => {
  return api.put(`/api/products/${id}`, data);
};

// DELETE PRODUCT
export const deleteProduct = (id: string) => {
  return api.delete(`/api/products/${id}`);
};
