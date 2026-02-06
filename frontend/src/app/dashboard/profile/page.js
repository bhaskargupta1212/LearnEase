"use client";

import { useDashboard } from "@/context/DashboardContext";

export default function ProfilePage() {
  const { user } = useDashboard();

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Loading profile...</p>
      </div>
    );
  }

  const initials = `${user?.name?.split(" ")[0]?.[0] ?? "U"}${
    user?.name?.split(" ")[1]?.[0] ?? ""
  }`;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-accent-color bg-gradient p-5 text-white text-center position-relative">
              <div
                className="rounded-circle bg-white text-accent-color fw-bold d-flex align-items-center justify-content-center mx-auto shadow"
                style={{ width: 90, height: 90, fontSize: 28 }}
              >
                {initials}
              </div>
              <h3 className="mt-3 mb-0 fw-semibold">{user.name}</h3>
              <span className="badge bg-light text-accent-color mt-2 px-3 py-2 fs-6">
                {user.role}
              </span>
            </div>

            {/* Body */}
            <div className="card-body p-4 p-md-5">
              <h5 className="fw-bold mb-4">Account Information</h5>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100 bg-light-subtle">
                    <small className="text-muted d-block">Full Name</small>
                    <span className="fw-semibold fs-5">{user.name}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100 bg-light-subtle">
                    <small className="text-muted d-block">Role</small>
                    <span className="fw-semibold fs-5 text-capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="col-12">
                  <div className="border rounded-3 p-3 bg-light-subtle">
                    <small className="text-muted d-block">Email Address</small>
                    <span className="fw-semibold fs-5">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="card-footer bg-white text-end border-0 pb-4 pe-4">
              <button className="btn-login-outline rounded-pill px-4">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
