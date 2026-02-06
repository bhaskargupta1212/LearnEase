const request = require("supertest");
const express = require("express");
const router = require("../auth.routes");

const authController = require("../../controllers/auth.controller");

jest.mock("../../controllers/auth.controller");

const app = express();
app.use(express.json());
app.use("/api/auth", router);

describe("Auth Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ================= SIGNUP =================
  test("POST /signup should call signup controller", async () => {
    authController.signup.mockImplementation((req, res) =>
      res.status(201).json({ message: "signup called" })
    );

    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "test@test.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("signup called");
    expect(authController.signup).toHaveBeenCalled();
  });

  // ================= LOGIN =================
  test("POST /login should call login controller", async () => {
    authController.login.mockImplementation((req, res) =>
      res.json({ message: "login called" })
    );

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.body.message).toBe("login called");
    expect(authController.login).toHaveBeenCalled();
  });

  // ================= FORGOT PASSWORD =================
  test("POST /forgot-password should call forgotPassword controller", async () => {
    authController.forgotPassword.mockImplementation((req, res) =>
      res.json({ message: "forgot called" })
    );

    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "test@test.com" });

    expect(res.body.message).toBe("forgot called");
    expect(authController.forgotPassword).toHaveBeenCalled();
  });

  // ================= RESET PASSWORD =================
  test("POST /reset-password should call resetPassword controller", async () => {
    authController.resetPassword.mockImplementation((req, res) =>
      res.json({ message: "reset called" })
    );

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({ token: "abc", password: "123456" });

    expect(res.body.message).toBe("reset called");
    expect(authController.resetPassword).toHaveBeenCalled();
  });
});
