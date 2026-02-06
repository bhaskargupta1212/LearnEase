const request = require("supertest");
const express = require("express");

// Route under test
const dashboardRoutes = require("../dashboard.routes");

// ---- MOCKS ----
jest.mock("../../middleware/auth.middleware", () =>
  jest.fn((req, res, next) => {
    req.user = { id: 1, role: "student" }; // default valid user
    next();
  })
);

jest.mock("../../config/db", () => ({
  query: jest.fn(),
}));

const pool = require("../../config/db");
const authMiddleware = require("../../middleware/auth.middleware");

// ---- APP SETUP ----
const app = express();
app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);

describe("Dashboard Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===============================
  // SUCCESS CASE
  // ===============================
  it("should return user profile successfully", async () => {
    pool.query.mockImplementation((sql, values, cb) => {
      cb(null, [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "john@test.com",
          role: "student",
        },
      ]);
    });

    const res = await request(app).get("/api/dashboard");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.name).toBe("John Doe");
    expect(res.body.user.email).toBe("john@test.com");
    expect(authMiddleware).toHaveBeenCalled();
  });

  // ===============================
  // USER NOT FOUND
  // ===============================
  it("should return 404 if user not found", async () => {
    pool.query.mockImplementation((sql, values, cb) => {
      cb(null, []);
    });

    const res = await request(app).get("/api/dashboard");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  // ===============================
  // DATABASE ERROR
  // ===============================
  it("should return 500 on DB error", async () => {
    pool.query.mockImplementation((sql, values, cb) => {
      cb(new Error("DB failed"), null);
    });

    const res = await request(app).get("/api/dashboard");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("DB error");
  });

  // ===============================
  // AUTH FAILURE (override mock)
  // ===============================
  it("should block request if auth middleware fails", async () => {
    authMiddleware.mockImplementationOnce((req, res) => {
      return res.status(401).json({ message: "Unauthorized" });
    });

    const res = await request(app).get("/api/dashboard");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });
});
