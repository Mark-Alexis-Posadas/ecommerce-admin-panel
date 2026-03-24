const Navbar = () => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="font-bold text-xl">Admin Panel</h2>
      <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
