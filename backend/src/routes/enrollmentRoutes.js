const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const db = require("../config/db");

/* ===============================
   GET: Logged-in user enrollments
   =============================== */
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT course_id FROM enrollments WHERE user_id = ?",
      [req.user.id]
    );

    const courseIds = rows.map(r => r.course_id);
    res.json(courseIds);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
