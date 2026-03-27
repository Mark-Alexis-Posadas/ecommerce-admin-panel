import { useEffect, useState } from "react";
import axios from "axios";
import { Package, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "../components/ui/Pagination";
interface Product {
  _id: string;
  title: string;
  price: number;
  image?: string;
  createdAt: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  // FETCH
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products?page=${page}&limit=5`,
      );
      setProducts(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // CREATE PRODUCT
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      return toast.error("Title & price required");
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/products", {
        title: form.title,
        price: Number(form.price),
        image: form.image,
      });

      setProducts([data, ...products]);
      setShowModal(false);

      setForm({ title: "", price: "", image: "" });

      toast.success("Product added 🚀");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="text-purple-400" />
          <h1 className="text-2xl font-bold">Products</h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm table-auto">
          <thead className="bg-white/10 text-gray-300">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t border-white/10 hover:bg-white/5"
              >
                {/* Product */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    )}
                    <span>{p.title}</span>
                  </div>
                </td>

                {/* Price */}
                <td className="p-4 text-purple-400">
                  ₱{Number(p.price || 0).toLocaleString()}
                </td>

                {/* Created */}
                <td className="p-4 text-gray-400">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {/* View */}
                    <button className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400">
                      <Eye size={18} />
                    </button>

                    {/* Edit */}
                    <button className="p-2 rounded-lg hover:bg-yellow-500/20 text-yellow-400">
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}
                    <button className="p-2 rounded-lg hover:bg-red-500/20 text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#0f0f1a] p-6 rounded-2xl w-full max-w-md border border-white/10">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="p-3 bg-white/5 border border-white/10 rounded-lg"
              />

              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="p-3 bg-white/5 border border-white/10 rounded-lg"
              />

              <input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="p-3 bg-white/5 border border-white/10 rounded-lg"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg"
                >
                  Create
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
