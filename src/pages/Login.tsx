import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function Login() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (loading) return <p>Loading session...</p>;
  if (user?.role === "admin") return <Navigate to="/" replace />;
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          try {
            await login(email, password);
            navigate("/");
          } catch {
            setError("Invalid credentials or admin access required");
          } finally {
            setBusy(false);
          }
        }}
      >
        <input
          type="email"
          required
          placeholder="Email"
          className="p-3 rounded-lg bg-white/5 border border-white/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="p-3 rounded-lg bg-white/5 border border-white/10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p role="alert">{error}</p>}
        <button
          disabled={busy}
          className="mt-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800"
        >
          {busy ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
