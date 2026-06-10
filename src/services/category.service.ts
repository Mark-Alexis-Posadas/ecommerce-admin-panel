import { api } from "./api.ts";

// GET ALL CATEGORIES
export const getCategories = async () => {
  return api.get("/api/categories");
};

// CREATE CATEGORY
export const createCategory = async (data: any) => {
  return api.post("/api/categories", data);
};

// UPDATE CATEGORY
export const updateCategory = async (id: string, data: any) => {
  return api.put(`/api/categories/${id}`, data);
};

// DELETE CATEGORY
export const deleteCategory = async (id: string) => {
  return api.delete(`/api/categories/${id}`);
};
