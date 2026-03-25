import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Login
      </h2>

      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
        />

        <button className="mt-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 transition">
          Login
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-purple-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
