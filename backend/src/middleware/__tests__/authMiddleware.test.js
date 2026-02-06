const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../auth.middleware");

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // protected route
    app.get("/protected", authMiddleware, (req, res) => {
      res.json({ success: true, user: req.user });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 401 if no Authorization header", async () => {
    const res = await request(app).get("/protected");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  test("should return 401 if Authorization header is invalid format", async () => {
    const res = await request(app)
      .get("/protected")
      .set("Authorization", "InvalidToken");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  test("should return 401 if token verification fails", async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer badtoken");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid or expired token");
  });

  test("should allow access with valid token", async () => {
    jwt.verify.mockReturnValue({ id: 1, role: "student" });

    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validtoken");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toEqual({ id: 1, role: "student" });
  });
});