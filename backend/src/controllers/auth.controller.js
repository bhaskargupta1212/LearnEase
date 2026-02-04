const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   pool.query(
//     "SELECT id, first_name, last_name, email, password, role FROM users WHERE email = ?",
//     [email],
//     async (err, results) => {
//       if (err) {
//         console.error("DB Error:", err);
//         return res.status(500).json({ message: "Database error" });
//       }

//       if (results.length === 0) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       const user = results[0];

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       // ✅ SUCCESS
//       res.status(200).json({
//         success: true,
//         message: "Login successful",
//         user: {
//           id: user.id,
//           name: `${user.first_name} ${user.last_name}`,
//           email: user.email,
//           role: user.role,
//         },
//       });
//     }
//   );
// };

/* =========================
   LOGIN WITH JWT
========================= */
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   pool.query(
//     "SELECT id, first_name, last_name, email, password, role FROM users WHERE email = ?",
//     [email],
//     async (err, results) => {
//       if (err) {
//         console.error("DB Error:", err);
//         return res.status(500).json({ message: "Database error" });
//       }

//       if (results.length === 0) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       const user = results[0];

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       // ✅ CREATE JWT TOKEN
//       const token = jwt.sign(
//         {
//           id: user.id,
//           email: user.email,
//           role: user.role,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN }
//       );

//       // ✅ SUCCESS RESPONSE
//       res.status(200).json({
//         success: true,
//         message: "Login successful",
//         token,
//         user: {
//           id: user.id,
//           name: `${user.first_name} ${user.last_name}`,
//           email: user.email,
//           role: user.role,
//         },
//       });
//     }
//   );
// };


// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   pool.query(
//     "SELECT id, first_name, last_name, email, password, role FROM users WHERE email = ?",
//     [email],
//     async (err, results) => {
//       if (err) return res.status(500).json({ message: "DB error" });
//       if (results.length === 0)
//         return res.status(401).json({ message: "Invalid credentials" });

//       const user = results[0];
//       const match = await bcrypt.compare(password, user.password);
//       if (!match)
//         return res.status(401).json({ message: "Invalid credentials" });

//       // ✅ CREATE JWT
//       const token = jwt.sign(
//         { id: user.id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN }
//       );

//       res.json({
//         success: true,
//         message: "Login successful",
//         token,
//         user: {
//           id: user.id,
//           name: `${user.first_name} ${user.last_name}`,
//           email: user.email,
//           role: user.role,
//         },
//       });
//     }
//   );
// };

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