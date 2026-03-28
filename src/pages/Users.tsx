import { useEffect, useState } from "react";
import axios from "axios";
import { Users as UsersIcon } from "lucide-react";
import toast from "react-hot-toast";
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users");
        setUsers(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-white">Loading users...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <UsersIcon className="text-purple-400" />
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/10 text-gray-300">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-gray-300">{user.email}</td>
                <td className="p-4 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="p-6 text-center text-gray-400">No users found</div>
        )}
      </div>
    </div>
  );
};

export default Users;
