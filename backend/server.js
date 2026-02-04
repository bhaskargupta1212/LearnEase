const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const authRoutes = require("./src/routes/auth.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/dashboard", require("./src/routes/dashboard.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
