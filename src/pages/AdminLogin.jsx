import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", { email, password });
      console.log("LOGIN SUCCESS:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Admin Panel
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="admin@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold tracking-wide hover:bg-indigo-700 active:scale-[0.98] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
