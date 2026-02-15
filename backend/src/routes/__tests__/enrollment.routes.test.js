const request = require("supertest");
const express = require("express");

// Mock DB
jest.mock("../../config/db", () => ({
  query: jest.fn(),
}));

// Mock auth middleware
jest.mock("../../middleware/auth.middleware", () =>
  jest.fn((req, res, next) => {
    req.user = { id: 1 };
    next();
  })
);

const db = require("../../config/db");
const router = require("../enrollment.routes");

describe("Enrollment Routes Tests", () => {

  const app = express();
  app.use(express.json());
  app.use("/enrollments", router);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===============================
  // SUCCESS CASE
  // ===============================

  test("GET /enrollments/my-courses should return course IDs", async () => {

    db.query.mockResolvedValue([
      [
        { course_id: 10 },
        { course_id: 20 }
      ]
    ]);

    const res = await request(app).get("/enrollments/my-courses");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([10, 20]);

    expect(db.query).toHaveBeenCalledWith(
      "SELECT course_id FROM enrollments WHERE user_id = ?",
      [1]
    );
  });

  // ===============================
  // EMPTY RESULT
  // ===============================

  test("GET /enrollments/my-courses should return empty array if no enrollments", async () => {

    db.query.mockResolvedValue([[]]);

    const res = await request(app).get("/enrollments/my-courses");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // ===============================
  // ERROR CASE (CATCH BLOCK)
  // ===============================

  test("GET /enrollments/my-courses should return 500 on DB error", async () => {

    db.query.mockRejectedValue(new Error("DB failure"));

    const res = await request(app).get("/enrollments/my-courses");

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: "Server error" });
  });

});
