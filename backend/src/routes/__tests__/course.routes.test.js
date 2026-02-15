const request = require("supertest");
const express = require("express");

// Mock controller
jest.mock("../../controllers/course.controller", () => ({
  createCourse: jest.fn((req, res) => res.json({ action: "create" })),
  updateCourse: jest.fn((req, res) => res.json({ action: "update" })),
  deleteCourse: jest.fn((req, res) => res.json({ action: "delete" })),
  getCourses: jest.fn((req, res) => res.json({ action: "getAll" })),
  myCourses: jest.fn((req, res) => res.json({ action: "myCourses" })),
  enrollCourse: jest.fn((req, res) => res.json({ action: "enroll" })),
  getCourse: jest.fn((req, res) => res.json({ action: "getOne" })),
}));

// Mock auth middleware
jest.mock("../../middleware/auth.middleware", () =>
  jest.fn((req, res, next) => {
    req.user = { id: 1, role: "admin" };
    next();
  })
);

// Mock role middleware
jest.mock("../../middleware/role.middleware", () =>
  jest.fn(() => (req, res, next) => next())
);

const router = require("../course.routes");

describe("Course Routes Tests", () => {

  const app = express();
  app.use(express.json());
  app.use("/courses", router);

  // --------------------------
  // ADMIN ROUTES
  // --------------------------

  test("POST /courses should call createCourse", async () => {
    const res = await request(app).post("/courses");

    expect(res.statusCode).toBe(200);
    expect(res.body.action).toBe("create");
  });

  test("PUT /courses/:id should call updateCourse", async () => {
    const res = await request(app).put("/courses/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.action).toBe("update");
  });

  test("DELETE /courses/:id should call deleteCourse", async () => {
    const res = await request(app).delete("/courses/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.action).toBe("delete");
  });

  // --------------------------
  // PUBLIC ROUTES
  // --------------------------

  test("GET /courses should call getCourses", async () => {
    const res = await request(app).get("/courses");

    expect(res.statusCode).toBe(200);
    expect(res.body.action).toBe("getAll");
  });

  test("GET /courses/:id should call getCourse", async () => {
    const res = await request(app).get("/courses/10");

    expect(res.statusCode).toBe(200);
    expect(res.body.action).toBe("getOne");
  });

  // --------------------------
  // STUDENT ROUTES
  // --------------------------

  test("GET /courses/my-courses should call myCourses", async () => {
    const res = await request(app).get("/courses/my-courses");

    expect(res.statusCode).toBe(200);
    expect(res.body.action).toBe("myCourses");
  });

  test("POST /courses/enroll/:id should call enrollCourse", async () => {
    const res = await request(app).post("/courses/enroll/5");

    expect(res.statusCode).toBe(200);
    expect(res.body.action).toBe("enroll");
  });

});
