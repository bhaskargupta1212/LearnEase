const db = require("../config/db");

exports.getAll = (cb) => {
  db.query("SELECT * FROM courses ORDER BY id DESC", cb);
};

exports.getById = (id, cb) => {
  db.query("SELECT * FROM courses WHERE id = ?", [id], cb);
};

exports.create = (data, cb) => {
  db.query("INSERT INTO courses SET ?", data, cb);
};

exports.update = (id, data, cb) => {
  db.query("UPDATE courses SET ? WHERE id = ?", [data, id], cb);
};

exports.remove = (id, cb) => {
  db.query("DELETE FROM courses WHERE id = ?", [id], cb);
};

exports.enroll = (userId, courseId, cb) => {
  db.query(
    "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)",
    [userId, courseId],
    cb
  );
};

exports.getUserCourses = (userId, cb) => {
  db.query(
    `SELECT c.* FROM courses c
     JOIN enrollments e ON e.course_id = c.id
     WHERE e.user_id = ?`,
    [userId],
    cb
  );
};
