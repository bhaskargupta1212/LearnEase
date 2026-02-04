const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const pool = require("../config/db");

router.get("/", auth, (req, res) => {
  pool.query(
    "SELECT id, first_name, last_name, email, role FROM users WHERE id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });

      const user = results[0];

      res.json({
        success: true,
        user: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
});

module.exports = router;
