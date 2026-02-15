"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  const loadMyCourses = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    setLoading(false);   // ✅ important
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:5000/api/courses/my-courses",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    console.log("data::", data);

    setCourses(data || []);
  } catch (error) {
    console.error("Error:", error);
    setCourses([]);
  }

  setLoading(false);  // ✅ always runs
};

useEffect(() => {
    loadMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading your courses...</p>
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */

  if (!courses.length) {
    return (
      <div className="text-center py-5">
        <h3>You are not enrolled in any course 😔</h3>
        <p className="text-muted">
          Start learning today by enrolling in a course
        </p>

        <Link href="/dashboard/courses" className="btn btn-login mt-3 px-4">
          Browse Courses
        </Link>
      </div>
    );
  }

  /* ---------------- MY COURSES ---------------- */

  return (
    <div className="row">
      {courses.map((course) => (
        <div key={course.id} className="col-lg-4 col-md-6 mb-4">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
            <Image
              src={course.thumbnail || "/images/course-1.jpg"}
              alt={course.title}
              width={600}
              height={400}
              className="img-fluid"
            />

            <div className="card-body">
              <span className="badge bg-success mb-2">Enrolled</span>

              <h5 className="card-title">{course.title}</h5>

              <p className="small text-muted">
                {course.description?.slice(0, 120)}...
              </p>

              <Link
                href={`/learn/${course.id}`}
                className="btn btn-dark w-100 rounded-pill"
              >
                Continue Learning →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
