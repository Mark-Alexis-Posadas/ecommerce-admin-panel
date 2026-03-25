const Navbar = () => {
  return (
    <div className="h-16 bg-[#0f0f1a]/80 backdrop-blur border-b border-white/10 flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg text-white">Dashboard</h2>

      <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:opacity-90 transition">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
