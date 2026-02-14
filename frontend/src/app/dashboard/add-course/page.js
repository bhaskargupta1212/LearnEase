"use client";

import { useState } from "react";
import axios from "axios";

export default function AddCourse() {
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
const [msg, setMsg] = useState("");

const handleChange = (e) =>
setForm({ ...form, [e.target.name]: e.target.value });

const submit = async (e) => {
e.preventDefault();
setLoading(true);
setMsg("");

```
try {
  const token = localStorage.getItem("token");

  await axios.post(
    "http://localhost:5000/api/courses",
    form,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setMsg("✅ Course created successfully");
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
  setMsg(err.response?.data?.message || "Failed to create course");
} finally {
  setLoading(false);
}
```

};

return ( <div className="container py-4"> <h2 className="mb-4">Upload New Course</h2>

```
  {msg && <div className="alert alert-info">{msg}</div>}

  <form onSubmit={submit} className="card p-4 shadow">

    <input className="form-control mb-3" name="title" placeholder="Course Title" value={form.title} onChange={handleChange} required />

    <textarea className="form-control mb-3" name="description" placeholder="Description" rows="4" value={form.description} onChange={handleChange} required />

    <input className="form-control mb-3" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />

    <input type="number" className="form-control mb-3" name="price" placeholder="Price" value={form.price} onChange={handleChange} />

    <select className="form-select mb-3" name="level" value={form.level} onChange={handleChange}>
      <option>Beginner</option>
      <option>Intermediate</option>
      <option>Advanced</option>
    </select>

    <input className="form-control mb-3" name="instructor_name" placeholder="Instructor Name" value={form.instructor_name} onChange={handleChange} />

    <input className="form-control mb-3" name="duration" placeholder="Duration (e.g. 10 hours)" value={form.duration} onChange={handleChange} />

    <input className="form-control mb-3" name="thumbnail" placeholder="Thumbnail Image URL" value={form.thumbnail} onChange={handleChange} />

    <button className="btn btn-primary" disabled={loading}>
      {loading ? "Creating..." : "Create Course"}
    </button>

  </form>
</div>
```

);
}
