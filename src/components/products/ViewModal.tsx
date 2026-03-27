const ViewModal = ({ selectedProduct, setShowViewModal }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[#0f0f1a] p-6 rounded-2xl w-full max-w-md border border-white/10">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>

        {selectedProduct.image && (
          <img
            src={selectedProduct.image}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        <p>
          <b>Title:</b> {selectedProduct.title}
        </p>
        <p>
          <b>Price:</b> ₱{selectedProduct.price}
        </p>
        <p>
          <b>Created:</b>{" "}
          {new Date(selectedProduct.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => setShowViewModal(false)}
          className="mt-4 w-full py-2 bg-gray-700 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewModal;
