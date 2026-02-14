const Course = require("../models/course.model");

exports.getCourses = (req, res) => {
  Course.getAll((err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
};

exports.getCourse = (req, res) => {
  Course.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (!results.length) return res.status(404).json({ message: "Not found" });
    res.json(results[0]);
  });
};

exports.createCourse = (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  Course.create({ ...req.body, created_by: req.user.id }, (err) => {
    if (err) return res.status(500).json({ message: "Create failed" });
    res.json({ success: true });
  });
};

exports.updateCourse = (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  Course.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    res.json({ success: true });
  });
};

exports.deleteCourse = (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  Course.remove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ success: true });
  });
};

exports.enrollCourse = (req, res) => {
  Course.enroll(req.user.id, req.params.id, (err) => {
    if (err) return res.status(400).json({ message: "Already enrolled" });
    res.json({ success: true });
  });
};

exports.myCourses = (req, res) => {
  Course.getUserCourses(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
};
