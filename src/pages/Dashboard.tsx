const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur shadow">
        <h3 className="text-gray-400">Total Products</h3>
        <p className="text-2xl font-bold mt-2">120</p>
      </div>

      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur shadow">
        <h3 className="text-gray-400">Orders</h3>
        <p className="text-2xl font-bold mt-2">89</p>
      </div>

      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur shadow">
        <h3 className="text-gray-400">Users</h3>
        <p className="text-2xl font-bold mt-2">45</p>
      </div>
    </div>
  );
};

export default Dashboard;
