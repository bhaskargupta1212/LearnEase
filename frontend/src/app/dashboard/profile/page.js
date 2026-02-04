"use client";

import { useDashboard } from "@/context/DashboardContext";

export default function ProfilePage() {
  const { user } = useDashboard();

  return (
    <>
      <h2>My Profile</h2>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
      <p>Email: {user.email}</p>
    </>
  );
}
