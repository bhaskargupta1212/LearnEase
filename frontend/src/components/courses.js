"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Load All Courses ---------------- */

  const loadCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();
      setCourses(data || []);
    } catch {
      setCourses([]);
    }
    setLoading(false);
  };

  /* ---------------- Load My Enrollments ---------------- */

  const loadEnrollments = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(
      "http://localhost:5000/api/enrollments/my-courses",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    // 🔥 handle all possible backend formats
    let ids = [];

    if (Array.isArray(data)) {
      // case: [ {course_id:1}, {course_id:2} ]
      if (data.length && typeof data[0] === "object") {
        ids = data.map(e => e.course_id || e.id);
      } 
      // case: [1,2,3]
      else {
        ids = data;
      }
    }

    // case: {data:[...]}
    if (data?.data) {
      ids = data.data.map(e => e.course_id || e.id);
    }

    setEnrolledCourses(ids);

  } catch (err) {
    console.log("Enrollment load error", err);
    setEnrolledCourses([]);
  }
};


   useEffect(() => {
    loadCourses();
    loadEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading courses...</p>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="text-center py-5">
        <h4>No courses available yet</h4>
        <p>Admin will add courses soon.</p>
      </div>
    );
  }

  return (
    <section id="courses" className="courses section">
      <div className="container section-title">
        <h2>Courses</h2>
        <p>Popular Courses</p>
      </div>

      <div className="container">
        <div className="row">
          {courses.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              delay={(i + 1) * 100}
              isEnrolled={enrolledCourses.includes(course.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Course Card ================= */

function CourseCard({ course, delay, isEnrolled }) {
  const router = useRouter();

  const enrollCourse = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/enroll/${course.id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Enrollment successful 🎉");
        window.location.reload(); // refresh UI
      } else {
        alert(data.message || "Already enrolled");
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div
      className="col-lg-4 col-md-6 d-flex align-items-stretch"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="course-item shadow-sm border-0 rounded-4 overflow-hidden">
        <Image
          src={course.thumbnail || "/images/course-1.jpg"}
          alt={course.title}
          width={600}
          height={400}
          className="img-fluid"
        />

        <div className="course-content p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge btn-badge">{course.category}</span>
            <span className="fw-bold text-success">₹{course.price}</span>
          </div>

          <h4 className="mb-2">
            <Link
              href={`/courses/${course.id}`}
              className="text-dark text-decoration-none"
            >
              {course.title}
            </Link>
          </h4>

          <p className="small text-muted">
            {course.description?.slice(0, 100)}...
          </p>

          {/* ---------- ENROLL STATUS ---------- */}

          {isEnrolled ? (
            <div className="text-center mt-2">
              <span className="badge bg-success px-3 py-2 rounded-pill">
                ✔ Enrolled
              </span>
            </div>
          ) : (
            <button
              onClick={enrollCourse}
              className="btn btn-login w-100 mt-2 rounded-pill"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
