"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "./AuthLayout";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const clearMessageAfter10s = () => {
    setTimeout(() => setMessage(null), 10000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || "Login failed");
        clearMessageAfter10s();
        return;
      }

      // ✅ STORE JWT + USER
      localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));

      setIsError(false);
      setMessage(data.message);
      clearMessageAfter10s();

      // ✅ REDIRECT
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error) {
      setIsError(true);
      setMessage("Server not reachable");
      clearMessageAfter10s();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="fw-bold">
            Create Account
          </Link>
        </>
      }
    >
      {message && (
        <div className={`alert ${isError ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Email address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">Remember me</label>
          </div>

          <Link href="/forgot-password" className="fw-bold">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-login w-100 my-3"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthLayout>
  );
}
