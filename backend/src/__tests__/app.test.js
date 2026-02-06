const request = require("supertest");

/* ---------------- MOCK ROUTES ---------------- */

jest.mock("../routes/auth.routes", () => {
  const express = require("express");
  const router = express.Router();

  // fake route
  router.get("/test", (req, res) => {
    res.json({ message: "auth route working" });
  });

  router.post("/login", (req, res) => {
    res.json({ received: req.body });
  });

  return router;
});

/* ---------------- IMPORT APP AFTER MOCK ---------------- */
const app = require("../app");

/* ---------------- TESTS ---------------- */

describe("Express App", () => {
  test("app should be defined", () => {
    expect(app).toBeDefined();
  });

  test("auth route is mounted at /api/auth", async () => {
    const res = await request(app).get("/api/auth/test");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "auth route working" });
  });

  test("express.json middleware parses body", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.received).toEqual({
      email: "test@test.com",
      password: "123456",
    });
  });

  test("cors headers exist", async () => {
    const res = await request(app).get("/api/auth/test");

    expect(res.headers["access-control-allow-origin"]).toBe("*");
  });
});
