"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/utils/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import { DashboardContext } from "@/context/DashboardContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
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

    loadUser();
  }, [router]);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <DashboardContext.Provider value={{ user }}>
      <div className="dashboard-layout" data-testid="sidebar">
        <Sidebar user={user} />
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </DashboardContext.Provider>
  );
}
