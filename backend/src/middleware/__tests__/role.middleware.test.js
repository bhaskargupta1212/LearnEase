const request = require("supertest");
const express = require("express");
const roleMiddleware = require("../role.middleware");

describe("Role Middleware Tests", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------
  // ❌ No user -> 403
  // -----------------------------------
  test("should return 403 if no user", async () => {

    const app = express();
    app.use(express.json());

    app.get(
      "/test",
      roleMiddleware(["admin"]),
      (req, res) => res.json({ success: true })
    );

    const res = await request(app).get("/test");

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Access denied");
  });

  // -----------------------------------
  // ❌ User role not allowed -> 403
  // -----------------------------------
  test("should return 403 if role not allowed", async () => {

    const app = express();
    app.use(express.json());

    app.get(
      "/test",
      (req, res, next) => {
        req.user = { role: "student" };
        next();
      },
      roleMiddleware(["admin"]),
      (req, res) => res.json({ success: true })
    );

    const res = await request(app).get("/test");

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Access denied");
  });

  // -----------------------------------
  // ❌ Empty allowedRoles -> 403
  // -----------------------------------
  test("should return 403 if allowedRoles is empty", async () => {

    const app = express();
    app.use(express.json());

    app.get(
      "/test",
      (req, res, next) => {
        req.user = { role: "admin" };
        next();
      },
      roleMiddleware([]), // no roles allowed
      (req, res) => res.json({ success: true })
    );

    const res = await request(app).get("/test");

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Access denied");
  });

  // -----------------------------------
  // ✅ Role allowed -> next()
  // -----------------------------------
  test("should allow access if role is allowed", async () => {

    const app = express();
    app.use(express.json());

    app.get(
      "/test",
      (req, res, next) => {
        req.user = { role: "admin" };
        next();
      },
      roleMiddleware(["admin", "teacher"]),
      (req, res) => res.json({ success: true })
    );

    const res = await request(app).get("/test");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("should return 403 when no allowedRoles argument is passed (default [])", async () => {

  const app = express();
  app.use(express.json());

  app.get(
    "/test",
    (req, res, next) => {
      req.user = { role: "admin" };
      next();
    },
    roleMiddleware(), // ✅ no argument passed (uses default [])
    (req, res) => res.json({ success: true })
  );

  const res = await request(app).get("/test");

  expect(res.statusCode).toBe(403);
  expect(res.body.message).toBe("Access denied");
});


});
