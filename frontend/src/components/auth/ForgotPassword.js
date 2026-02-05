"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMsg(data.message);

    // ⏱ message only 10 sec
    setTimeout(() => setMsg(""), 10000);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a password reset link"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email address</label>
        </div>

        {msg && <p className="text-center text-success">{msg}</p>}

        <button type="submit" className="btn btn-login w-100 my-3">
          Send Reset Link
        </button>

        <div className="text-center mt-3">
          <Link href="/login" className="fw-bold">
            Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
