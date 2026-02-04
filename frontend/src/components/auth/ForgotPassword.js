"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔌 Replace with API later
    console.log("Reset Password Email:", email);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a password reset link"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email address</label>
        </div>

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
