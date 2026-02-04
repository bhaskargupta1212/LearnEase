const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("node:crypto");

exports.signup = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // ✅ CHECK EXISTING USER
  pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // ✅ FIX: results is the array
      if (results.length > 0) {
        return res.status(409).json({ message: "Email already exists" });
      }

      // HASH PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);

      pool.query(
        `INSERT INTO users (first_name, last_name, email, password, role)
         VALUES (?, ?, ?, ?, ?)`,
        [firstName, lastName, email, hashedPassword, role],
        (err) => {
          if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ message: "Signup failed" });
          }

          res.status(201).json({
            success: true,
            message: "Account created successfully",
          });
        }
      );
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT id, first_name, last_name, email, password, role FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (results.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

      // ✅ JWT (ONLY ID + ROLE)
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: "Email is required" });

  pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });

      // 🔒 Security: do not expose email existence
      if (results.length === 0) {
        return res.json({
          success: true,
          message: "If the email exists, reset link has been sent",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

      pool.query(
        "UPDATE users SET reset_token=?, reset_token_expiry=? WHERE email=?",
        [resetToken, expiry, email],
        () => {
          const resetLink = `http://localhost:3000/reset-password/${resetToken}/`;

          console.log("RESET LINK (DEV):", resetLink);

          res.json({
            success: true,
            message: "Password reset link sent",
          });
        }
      );
    }
  );
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password)
    return res.status(400).json({ message: "Invalid request" });

  const now = Date.now(); // ✅ JS timestamp

  pool.query(
    "SELECT id FROM users WHERE reset_token=? AND reset_token_expiry > ?",
    [token, now],
    async (err, results) => {
      if (err) {
        console.error("RESET PASSWORD DB ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }

      if (results.length === 0)
        return res
          .status(400)
          .json({ message: "Token expired or invalid" });

      const hashedPassword = await bcrypt.hash(password, 10);

      pool.query(
        `UPDATE users 
         SET password=?, reset_token=NULL, reset_token_expiry=NULL 
         WHERE id=?`,
        [hashedPassword, results[0].id],
        (err) => {
          if (err) {
            console.error("PASSWORD UPDATE ERROR:", err);
            return res
              .status(500)
              .json({ message: "Password update failed" });
          }

          res.json({
            success: true,
            message: "Password reset successful. Please login.",
          });
        }
      );
    }
  );
};
