"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Signup() {
  const initialForm = {
    firstName: "",
    lastName: "",
    role: "student",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 10000); // ⏱️ 10 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message || "Signup failed", "error");
        return;
      }

      // ✅ SUCCESS
      showMessage("Account created successfully 🎉", "success");
      setForm(initialForm); // 🔄 reset only on success
    } catch (error) {
      showMessage("Server not reachable. Try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle={
        <>
          Already have an account?{" "}
          <Link href="/login" className="fw-bold">
            Sign in here
          </Link>
        </>
      }
    >
      {/* 🔔 ALERT MESSAGE */}
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="form-floating mb-3">
          <input
            id="firstName"
            type="text"
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="firstName">First Name</label>
        </div>

        {/* Last Name */}
        <div className="form-floating mb-3">
          <input
            id="lastName"
            type="text"
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="lastName">Last Name</label>
        </div>

        {/* Role */}
        <div className="mb-3">
          <label className="fw-semibold">Select Role</label>
          <div className="d-flex gap-4 mt-2">
            {["student", "trainer", "admin"].map((role) => (
              <div className="form-check" key={role}>
                <input
                  id={`role-${role}`}
                  className="form-check-input"
                  type="radio"
                  name="role"
                  value={role}
                  checked={form.role === role}
                  onChange={handleChange}
                />
                <label className="form-check-label text-capitalize"  htmlFor={`role-${role}`}>
                  {role}
                </label>
              </div>
            ))}
          </div>
        </div>
        

        {/* Email */}
        <div className="form-floating mb-3">
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email address</label>
        </div>

        {/* Password */}
        <div className="form-floating mb-3">
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        {/* Confirm Password */}
        <div className="form-floating mb-3">
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className="form-control"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        {/* Terms */}
        <div className="form-check mb-3">
          <input
            id="agree"
            className="form-check-input"
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
          />
          <label htmlFor="agree" className="form-check-label ms-2">
            I agree to <Link href="#">Terms & Conditions</Link>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-login w-100"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Continue"}
        </button>
      </form>
    </AuthLayout>
  );
}
