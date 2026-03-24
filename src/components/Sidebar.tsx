import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/products" className="hover:text-gray-300">
          Products
        </Link>
        <Link to="/orders" className="hover:text-gray-300">
          Orders
        </Link>
        <Link to="/users" className="hover:text-gray-300">
          Users
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
