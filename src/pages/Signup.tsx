import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // validation
  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return false;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (!form.email.includes("@")) {
      toast.error("Invalid email");
      return false;
    }

    return true;
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form,
      );

      toast.success("Account created 🎉");

      // optional: save token
      localStorage.setItem("userInfo", JSON.stringify(data));

      // redirect
      navigate("/");
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

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
        />

        <button
          disabled={loading}
          className="mt-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
