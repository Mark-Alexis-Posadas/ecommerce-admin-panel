const EditModal = ({ handleUpdate, form, setForm, setShowEditModal }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[#0f0f1a] p-6 rounded-2xl w-full max-w-md border border-white/10">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 bg-white/5 border border-white/10 rounded-lg"
          />

          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 bg-white/5 border border-white/10 rounded-lg"
          />

          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="p-3 bg-white/5 border border-white/10 rounded-lg"
          />

          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-yellow-600 rounded-lg">
              Update
            </button>

            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="flex-1 py-2 bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
