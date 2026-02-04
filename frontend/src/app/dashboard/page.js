"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/utils/auth";
import Sidebar from "@/components/dashboard/Sidebar";

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

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />

      <main className="dashboard-content">
        <h2>Welcome, {user.name}</h2>
        <p>Role: {user.role}</p>
      </main>
    </div>
  );
}
