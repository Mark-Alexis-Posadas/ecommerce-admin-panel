import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

// ✅ NEW PAGES
import Categories from "./pages/Categories";
import Coupons from "./pages/Coupons";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* AUTH */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />

        {/* ADMIN */}
        <Route
          path="/"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/products"
          element={
            <AdminLayout>
              <Products />
            </AdminLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <AdminLayout>
              <Orders />
            </AdminLayout>
          }
        />

        <Route
          path="/users"
          element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          }
        />

        {/* ✅ NEW ROUTES */}
        <Route
          path="/categories"
          element={
            <AdminLayout>
              <Categories />
            </AdminLayout>
          }
        />

        <Route
          path="/coupons"
          element={
            <AdminLayout>
              <Coupons />
            </AdminLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <AdminLayout>
              <Settings />
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
