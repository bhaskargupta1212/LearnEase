"use client";

import { useDashboard } from "@/context/DashboardContext";

export default function DashboardPage() {
  const { user } = useDashboard();

  const stats = [
    { title: "Enrolled Courses", value: 6, icon: "bi-journal-bookmark" },
    { title: "Completed", value: 2, icon: "bi-check-circle" },
    { title: "Pending Assessments", value: 3, icon: "bi-pencil-square" },
    { title: "Certificates", value: 1, icon: "bi-award" },
  ];

  const courses = [
    { name: "React Fundamentals", progress: 70 },
    { name: "Node.js API Development", progress: 45 },
    { name: "MySQL Database Design", progress: 90 },
  ];

  const activities = [
    "Completed lesson: React Components",
    "Attempted Quiz: JavaScript Basics",
    "Enrolled in Node.js Course",
  ];

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Welcome back, {user?.name}</h2>
        <p className="text-muted mb-0">Role: {user?.role}</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div className="col-md-6 col-lg-3" key={i}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="fs-2 text-primary">
                  <i className={`bi ${s.icon}`}></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">{s.title}</h6>
                  <h4 className="fw-bold mb-0">{s.value}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Course Progress */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 fw-semibold">
              My Course Progress
            </div>
            <div className="card-body">
              {courses.map((c, i) => (
                <div className="mb-4" key={i}>
                  <div className="d-flex justify-content-between">
                    <span className="fw-medium">{c.name}</span>
                    <span className="text-muted">{c.progress}%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${c.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-0 fw-semibold">
              Recent Activity
            </div>
            <ul className="list-group list-group-flush">
              {activities.map((a, i) => (
                <li key={i} className="list-group-item small">
                  <i className="bi bi-clock-history text-primary me-2"></i>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
