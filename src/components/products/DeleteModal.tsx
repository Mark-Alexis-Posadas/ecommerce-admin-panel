const DeleteModal = ({ selectedProduct, handleDelete, setShowDeleteModal }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[#0f0f1a] p-6 rounded-2xl w-full max-w-sm border border-white/10">
        <h2 className="text-lg font-bold mb-4 text-red-400">Delete Product</h2>

        <p className="mb-4">
          Are you sure you want to delete <b>{selectedProduct.title}</b>?
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="flex-1 py-2 bg-red-600 rounded-lg"
          >
            Delete
          </button>

          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 py-2 bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
