"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch, logout } from "@/utils/auth";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await authFetch("/dashboard");
        const data = await res.json();
        setUser(data.user);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  if (loading) return <h1 className="text-center mt-5">Loading...</h1>;

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>User Name: {user.name}</p>
      <p>User ID: {user.id}</p>
      <p>Role: {user.role}</p>

      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}
