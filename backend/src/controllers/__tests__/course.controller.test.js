const request = require("supertest");
const express = require("express");
const courseController = require("../course.controller");

// Mock Course model
jest.mock("../../models/course.model.js", () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  enroll: jest.fn(),
  getUserCourses: jest.fn(),
}));

const Course = require("../../models/course.model.js");

const app = express();
app.use(express.json());

// Mock middleware to inject req.user
const mockUser = (user) => (req, res, next) => {
  req.user = user;
  next();
};

// Routes
// Routes
app.get("/courses", courseController.getCourses);

// ⚠️ MUST come before /:id
app.get("/courses/my", mockUser({ id: 1 }), courseController.myCourses);

app.get("/courses/:id", courseController.getCourse);

app.post(
  "/courses",
  mockUser({ role: "admin", id: 1 }),
  courseController.createCourse,
);

app.put(
  "/courses/:id",
  mockUser({ role: "admin", id: 1 }),
  courseController.updateCourse,
);

app.delete(
  "/courses/:id",
  mockUser({ role: "admin", id: 1 }),
  courseController.deleteCourse,
);

app.post(
  "/courses/enroll/:id",
  mockUser({ id: 1 }),
  courseController.enrollCourse,
);

describe("Course Controller Tests", () => {
  afterEach(() => jest.clearAllMocks());

  // ---------- getCourses ----------
  test("should return all courses", async () => {
    Course.getAll.mockImplementation((cb) => cb(null, [{ id: 1 }]));

    const res = await request(app).get("/courses");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("should handle DB error in getCourses", async () => {
    Course.getAll.mockImplementation((cb) => cb(true));

    const res = await request(app).get("/courses");
    expect(res.statusCode).toBe(500);
  });

  // ---------- getCourse ----------
  test("should return single course", async () => {
    Course.getById.mockImplementation((id, cb) => cb(null, [{ id: 1 }]));

    const res = await request(app).get("/courses/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test("should return 404 if course not found", async () => {
    Course.getById.mockImplementation((id, cb) => cb(null, []));

    const res = await request(app).get("/courses/1");
    expect(res.statusCode).toBe(404);
  });

  // ---------- createCourse ----------
  test("admin can create course", async () => {
    Course.create.mockImplementation((data, cb) => cb(null));

    const res = await request(app).post("/courses").send({});
    expect(res.statusCode).toBe(200);
  });

  test("create course DB error", async () => {
    Course.create.mockImplementation((data, cb) => cb(true));

    const res = await request(app).post("/courses").send({});
    expect(res.statusCode).toBe(500);
  });

  // ---------- updateCourse ----------
  test("admin can update course", async () => {
    Course.update.mockImplementation((id, body, cb) => cb(null));

    const res = await request(app).put("/courses/1").send({});
    expect(res.statusCode).toBe(200);
  });

  test("update course DB error", async () => {
    Course.update.mockImplementation((id, body, cb) => cb(true));

    const res = await request(app).put("/courses/1").send({});
    expect(res.statusCode).toBe(500);
  });

  // ---------- deleteCourse ----------
  test("admin can delete course", async () => {
    Course.remove.mockImplementation((id, cb) => cb(null));

    const res = await request(app).delete("/courses/1");
    expect(res.statusCode).toBe(200);
  });

  test("delete course DB error", async () => {
    Course.remove.mockImplementation((id, cb) => cb(true));

    const res = await request(app).delete("/courses/1");
    expect(res.statusCode).toBe(500);
  });

  // ---------- enrollCourse ----------
  test("should enroll successfully", async () => {
    Course.enroll.mockImplementation((userId, courseId, cb) => cb(null));

    const res = await request(app).post("/courses/enroll/1");
    expect(res.statusCode).toBe(200);
  });

  test("should handle already enrolled error", async () => {
    Course.enroll.mockImplementation((userId, courseId, cb) => cb(true));

    const res = await request(app).post("/courses/enroll/1");
    expect(res.statusCode).toBe(400);
  });

  // ---------- myCourses ----------
  test("should return user courses", async () => {
    Course.getUserCourses.mockImplementation((id, cb) => cb(null, [{ id: 1 }]));

    const res = await request(app).get("/courses/my");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("should handle server error in myCourses", async () => {
    Course.getUserCourses.mockImplementation((id, cb) => cb(true));

    const res = await request(app).get("/courses/my");
    expect(res.statusCode).toBe(500);
  });

  test("should return 403 if non-admin tries to create course", async () => {
    const nonAdminApp = express();
    nonAdminApp.use(express.json());

    nonAdminApp.post(
      "/courses",
      mockUser({ role: "student", id: 2 }), // ❌ not admin
      courseController.createCourse,
    );

    const res = await request(nonAdminApp).post("/courses").send({});
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin only");
  });
  test("should return 403 if non-admin tries to update course", async () => {
    const nonAdminApp = express();
    nonAdminApp.use(express.json());

    nonAdminApp.put(
      "/courses/:id",
      mockUser({ role: "student", id: 2 }),
      courseController.updateCourse,
    );

    const res = await request(nonAdminApp).put("/courses/1").send({});
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin only");
  });

  test("should return 403 if non-admin tries to delete course", async () => {
    const nonAdminApp = express();
    nonAdminApp.use(express.json());

    nonAdminApp.delete(
      "/courses/:id",
      mockUser({ role: "student", id: 2 }),
      courseController.deleteCourse,
    );

    const res = await request(nonAdminApp).delete("/courses/1");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin only");
  });

  test("should return 401 if no user in myCourses", async () => {
    const testApp = express();
    testApp.use(express.json());

    testApp.get("/courses/my", courseController.myCourses);

    const res = await request(testApp).get("/courses/my");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  test("should return 401 if user id missing in myCourses", async () => {
    const testApp = express();
    testApp.use(express.json());

    testApp.get(
      "/courses/my",
      mockUser({}), // ❌ no id
      courseController.myCourses,
    );

    const res = await request(testApp).get("/courses/my");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid token");
  });
  test("should return 500 if DB error in getCourse", async () => {
  Course.getById.mockImplementation((id, cb) => cb(true));

  const res = await request(app).get("/courses/1");

  expect(res.statusCode).toBe(500);
  expect(res.body.message).toBe("DB error");
});

test("should use userId when id is not present in createCourse", async () => {

  Course.create.mockImplementation((data, cb) => {
    expect(data.created_by).toBe(99); // 🔥 important check
    cb(null);
  });

  const testApp = express();
  testApp.use(express.json());

  testApp.post(
    "/courses",
    mockUser({ role: "admin", userId: 99 }), // no id, only userId
    courseController.createCourse
  );

  const res = await request(testApp).post("/courses").send({});

  expect(res.statusCode).toBe(200);
});


});
