const request = require("supertest");
const express = require("express");
const adminMiddleware = require("../admin.middleware");

describe("Admin Middleware Tests", () => {

  const app = express();
  app.use(express.json());

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------
  // ❌ No user -> 403
  // -------------------------
  test("should return 403 if no user", async () => {

    app.get("/admin-test", adminMiddleware, (req, res) => {
      res.json({ success: true });
    });

    const res = await request(app).get("/admin-test");

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin only");
  });

  // -------------------------
  // ❌ Not admin -> 403
  // -------------------------
  test("should return 403 if user is not admin", async () => {

    const testApp = express();
    testApp.use(express.json());

    testApp.get(
      "/admin-test",
      (req, res, next) => {
        req.user = { role: "student" }; // not admin
        next();
      },
      adminMiddleware,
      (req, res) => {
        res.json({ success: true });
      }
    );

    const res = await request(testApp).get("/admin-test");

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin only");
  });

  // -------------------------
  // ✅ Admin -> next()
  // -------------------------
  test("should call next() if user is admin", async () => {

    const testApp = express();
    testApp.use(express.json());

    testApp.get(
      "/admin-test",
      (req, res, next) => {
        req.user = { role: "admin" };
        next();
      },
      adminMiddleware,
      (req, res) => {
        res.json({ success: true });
      }
    );

    const res = await request(testApp).get("/admin-test");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

});
