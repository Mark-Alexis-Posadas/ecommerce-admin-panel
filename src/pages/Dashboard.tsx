import { useEffect, useState } from "react";

type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
};
const Dashboard = () => {
  const [stats, setStats] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log(data);
        setStats(data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur shadow">
        <h3 className="text-gray-400">Total Products</h3>
        <p className="text-2xl font-bold mt-2">{stats.length}</p>
      </div>

      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur shadow">
        <h3 className="text-gray-400">Orders</h3>
        <p className="text-2xl font-bold mt-2">{stats.length}</p>
      </div>

      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur shadow">
        <h3 className="text-gray-400">Users</h3>
        <p className="text-2xl font-bold mt-2">{stats.length}</p>
      </div>
    </div>
  );
};

export default Dashboard;
