"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AddCourseForm() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    level: "Beginner",
    instructor_name: "",
    duration: "",
    thumbnail: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  // handle input
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // simple validation
  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.category.trim()) return "Category is required";
    if (!form.instructor_name.trim()) return "Instructor name required";
    if (!form.duration.trim()) return "Duration required";
    if (form.price < 0) return "Price cannot be negative";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {

      // token fallback (works for both cookie & localStorage system)
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }

      await axios.post(
        "http://localhost:5000/api/courses",
        {
          ...form,
          price: Number(form.price)
        },
        {
          withCredentials: true, // for cookie auth
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );

      setMsg("✅ Course uploaded successfully");

      // reset form
      setForm({
        title: "",
        description: "",
        category: "",
        price: "",
        level: "Beginner",
        instructor_name: "",
        duration: "",
        thumbnail: ""
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Server error while uploading course"
      );
    }

    setLoading(false);
  };

  // Auto hide success/error message after 5 seconds
useEffect(() => {
  if (msg || error) {
    const timer = setTimeout(() => {
      setMsg(null);
      setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [msg, error]);


  return (
    <div className="container py-4" style={{ maxWidth: 800 }}>

      <h3 className="mb-4">Upload New Course</h3>

      {msg && <div className="alert alert-success fade show">{msg}</div>}
      {error && <div className="alert alert-danger fade show">{error}</div>}


      <form className="card shadow p-4" onSubmit={submit}>

        <input
          className="form-control mb-3"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          rows="4"
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="category"
          placeholder="Category (Web Dev, AI, etc)"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="number"
          className="form-control mb-3"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <select
          className="form-select mb-3"
          name="level"
          value={form.level}
          onChange={handleChange}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <input
          className="form-control mb-3"
          name="instructor_name"
          placeholder="Instructor Name"
          value={form.instructor_name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="duration"
          placeholder="Duration (ex: 12 hours)"
          value={form.duration}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Uploading..." : "Upload Course"}
        </button>

      </form>
    </div>
  );
}
