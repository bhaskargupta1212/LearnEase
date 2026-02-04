"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/utils/auth";

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const roleTitleMap = {
    student: "Student Panel",
    trainer: "Trainer Panel",
    admin: "Admin Panel",
  };

  const panelTitle = roleTitleMap[user?.role] || "Dashboard";

  const isActive = (path) =>
    pathname === path ? "nav-link active" : "nav-link";

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Toggle button */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`}></i>
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* 🔥 Dynamic Title */}
        <h4 className="text-white text-center mb-4">{panelTitle}</h4>

        <ul className="nav flex-column">
          <li>
            <Link href="/dashboard" className={isActive("/dashboard")} onClick={closeSidebar}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link href="/profile" className={isActive("/profile")} onClick={closeSidebar}>
              My Profile
            </Link>
          </li>

          <li>
            <Link href="/courses" className={isActive("/courses")} onClick={closeSidebar}>
              Courses
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <p className="mb-1"><i className="bi bi-person-circle me-2"></i> {user?.name}</p>

          {/* 🔴 Logout stays red */}
          <button onClick={logout} className="btn btn-danger w-100">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
