const { signup, login, forgotPassword, resetPassword } = require("../controllers/auth.controller.js");
const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../config/db.js", () => ({
  query: jest.fn(),
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  let res;
  let req;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // ---------------- SIGNUP ----------------
  test("signup returns 400 if fields missing", async () => {
    req.body = { email: "test@test.com" };
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
  });

  test("signup returns 409 if email exists", async () => {
    req.body = { firstName: "A", lastName: "B", email: "test@test.com", password: "123", role: "user" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(null, [{}])); // user exists
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: "Email already exists" });
  });

  test("signup handles DB error", async () => {
    req.body = { firstName: "A", lastName: "B", email: "test@test.com", password: "123", role: "user" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(new Error("DB error"), null));
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
  });

  test("signup success", async () => {
    req.body = { firstName: "A", lastName: "B", email: "test@test.com", password: "123", role: "user" };
    pool.query
      .mockImplementationOnce((q, params, cb) => cb(null, [])) // no existing user
      .mockImplementationOnce((q, params, cb) => cb(null, {})); // insert success
    bcrypt.hash.mockResolvedValue("hashed");
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Account created successfully" });
  });

  // ---------------- LOGIN ----------------
  test("login returns 500 on DB error", async () => {
    req.body = { email: "a", password: "123" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(new Error("DB error")));
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });

  test("login returns 401 if user not found", async () => {
    req.body = { email: "a", password: "123" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(null, []));
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  test("login returns 401 if password mismatch", async () => {
    req.body = { email: "a", password: "123" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(null, [{ password: "hash", id: 1, role: "user", first_name: "A", last_name: "B", email: "a@test.com" }]));
    bcrypt.compare.mockResolvedValue(false);
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  test("login success returns JWT", async () => {
    req.body = { email: "a", password: "123" };
    const userData = { password: "hash", id: 1, role: "user", first_name: "A", last_name: "B", email: "a@test.com" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(null, [userData]));
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("token123");
    await login(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Login successful",
      token: "token123",
      user: {
        id: 1,
        name: "A B",
        email: "a@test.com",
        role: "user",
      },
    });
  });

  // ---------------- FORGOT PASSWORD ----------------
  test("forgotPassword returns 400 if no email", async () => {
    req.body = {};
    await forgotPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Email is required" });
  });

  test("forgotPassword handles DB error", async () => {
    req.body = { email: "a@test.com" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(new Error("DB error")));
    await forgotPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });

  test("forgotPassword with email not found", async () => {
    req.body = { email: "a@test.com" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(null, []));
    await forgotPassword(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "If the email exists, reset link has been sent" });
  });

  test("forgotPassword success", async () => {
    req.body = { email: "a@test.com" };
    pool.query
      .mockImplementationOnce((q, params, cb) => cb(null, [{}])) // user exists
      .mockImplementationOnce((q, params, cb) => cb(null, {})); // update token
    await forgotPassword(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Password reset link sent" });
  });

  // ---------------- RESET PASSWORD ----------------
  test("resetPassword returns 400 if missing token/password", async () => {
    req.body = {};
    await resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid request" });
  });

  test("resetPassword DB error", async () => {
    req.body = { token: "tok", password: "123" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(new Error("DB error")));
    await resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });

  test("resetPassword invalid token", async () => {
    req.body = { token: "tok", password: "123" };
    pool.query.mockImplementationOnce((q, params, cb) => cb(null, []));
    await resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Token expired or invalid" });
  });

  test("resetPassword update fails", async () => {
    req.body = { token: "tok", password: "123" };
    pool.query
      .mockImplementationOnce((q, params, cb) => cb(null, [{ id: 1 }])) // token valid
      .mockImplementationOnce((q, params, cb) => cb(new Error("update error"))); // update fails
    bcrypt.hash.mockResolvedValue("hashed");
    await resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Password update failed" });
  });

  test("resetPassword success", async () => {
    req.body = { token: "tok", password: "123" };
    pool.query
      .mockImplementationOnce((q, params, cb) => cb(null, [{ id: 1 }])) // token valid
      .mockImplementationOnce((q, params, cb) => cb(null, {})); // update success
    bcrypt.hash.mockResolvedValue("hashed");
    await resetPassword(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Password reset successful. Please login." });
  });

  test("signup handles INSERT DB error", async () => {
    req.body = { firstName: "A", lastName: "B", email: "test@test.com", password: "123", role: "user" };

    // First query: no existing user
    pool.query
        .mockImplementationOnce((q, params, cb) => cb(null, [])) // check existing user
        .mockImplementationOnce((q, params, cb) => cb(new Error("Insert Error"))); // INSERT fails

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Signup failed" });
    }); 
});
