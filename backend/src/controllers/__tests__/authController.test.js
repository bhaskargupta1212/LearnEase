const authController = require("../auth.controller");
const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

/* ---------------- MOCKS ---------------- */

jest.mock("../../config/db", () => ({
  query: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("node:crypto", () => ({
  randomBytes: jest.fn(() => ({
    toString: () => "mocked_reset_token",
  })),
}));

jest.mock("../../utils/sendEmail", () => jest.fn());

/* ---------------- MOCK RES ---------------- */

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Signup", () => {

  test("missing fields → 400", async () => {
    const req = { body: { email: "a@test.com" } };
    const res = mockRes();

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("email already exists → 409", async () => {
    pool.query.mockImplementation((sql, params, cb) => cb(null, [{ id: 1 }]));

    const req = {
      body: { firstName:"A", lastName:"B", email:"a@test.com", password:"123", role:"student" }
    };
    const res = mockRes();

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("successful signup → 201", async () => {
    pool.query
      .mockImplementationOnce((sql, params, cb) => cb(null, []))
      .mockImplementationOnce((sql, params, cb) => cb(null));

    bcrypt.hash.mockResolvedValue("hashed");

    const req = {
      body: { firstName:"A", lastName:"B", email:"a@test.com", password:"123", role:"student" }
    };
    const res = mockRes();

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

});

describe("Login", () => {

  test("user not found → 401", async () => {
    pool.query.mockImplementation((sql, params, cb) => cb(null, []));

    const req = { body: { email:"a@test.com", password:"123" }};
    const res = mockRes();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("wrong password → 401", async () => {
    pool.query.mockImplementation((sql, params, cb) =>
      cb(null, [{ id:1, first_name:"A", last_name:"B", email:"a@test.com", password:"hashed", role:"student"}])
    );

    bcrypt.compare.mockResolvedValue(false);

    const req = { body:{ email:"a@test.com", password:"wrong"} };
    const res = mockRes();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("successful login → token returned", async () => {
    pool.query.mockImplementation((sql, params, cb) =>
      cb(null, [{ id:1, first_name:"A", last_name:"B", email:"a@test.com", password:"hashed", role:"student"}])
    );

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mocked_token");

    const req = { body:{ email:"a@test.com", password:"123"} };
    const res = mockRes();

    await authController.login(req, res);

    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ token: "mocked_token" })
    );
  });

});

describe("Forgot Password", () => {

  test("no email → 400", () => {
    const req = { body:{} };
    const res = mockRes();

    authController.forgotPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("email not found → still success", () => {
    pool.query.mockImplementation((sql, params, cb) => cb(null, []));

    const req = { body:{ email:"x@test.com"} };
    const res = mockRes();

    authController.forgotPassword(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  test("email found → reset token generated", () => {
    pool.query
      .mockImplementationOnce((sql, params, cb) => cb(null, [{ id:1 }]))
      .mockImplementationOnce((sql, params, cb) => cb(null));

    const req = { body:{ email:"a@test.com"} };
    const res = mockRes();

    authController.forgotPassword(req, res);

    expect(crypto.randomBytes).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

});

describe("Reset Password", () => {

  test("missing token → 400", async () => {
    const req = { body:{} };
    const res = mockRes();

    await authController.resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("invalid token → 400", async () => {
    pool.query.mockImplementation((sql, params, cb) => cb(null, []));

    const req = { body:{ token:"bad", password:"123"} };
    const res = mockRes();

    await authController.resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("successful reset → success message", async () => {
    pool.query
      .mockImplementationOnce((sql, params, cb) => cb(null, [{ id:1 }]))
      .mockImplementationOnce((sql, params, cb) => cb(null));

    bcrypt.hash.mockResolvedValue("new_hashed");

    const req = { body:{ token:"good", password:"123"} };
    const res = mockRes();

    await authController.resetPassword(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  test("signup DB error → 500", async () => {
  pool.query.mockImplementation((sql, params, cb) => cb(new Error("DB fail")));

  const req = {
    body:{ firstName:"A", lastName:"B", email:"a@test.com", password:"123", role:"student"}
  };
  const res = mockRes();

  await authController.signup(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
});

test("signup insert error → 500", async () => {
  pool.query
    .mockImplementationOnce((sql, params, cb) => cb(null, []))
    .mockImplementationOnce((sql, params, cb) => cb(new Error("insert fail")));

  bcrypt.hash.mockResolvedValue("hashed");

  const req = {
    body:{ firstName:"A", lastName:"B", email:"a@test.com", password:"123", role:"student"}
  };
  const res = mockRes();

  await authController.signup(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ message: "Signup failed" });
});

test("login DB error → 500", (done) => {
  pool.query.mockImplementation((sql, params, cb) => {
    setTimeout(() => cb(new Error("DB fail")), 0);
  });

  const req = { body: { email: "a@test.com", password: "123" } };
  const res = mockRes();

  res.status.mockImplementation((code) => {
    expect(code).toBe(500);
    return res;
  });

  res.json.mockImplementation((data) => {
    expect(data).toEqual({ message: "DB error" });
    done(); // <-- COVERAGE MARKED HERE
    return res;
  });

  authController.login(req, res);
});



test("reset password DB error → 500", async () => {
  pool.query.mockImplementation((sql, params, cb) => cb(new Error("fail")));

  const req = { body:{ token:"t", password:"123"} };
  const res = mockRes();

  await authController.resetPassword(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});

test("reset password update failure → 500", async () => {
  pool.query
    .mockImplementationOnce((sql, params, cb) => cb(null, [{ id:1 }]))
    .mockImplementationOnce((sql, params, cb) => cb(new Error("update fail")));

  bcrypt.hash.mockResolvedValue("hashed");

  const req = { body:{ token:"good", password:"123"} };
  const res = mockRes();

  await authController.resetPassword(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ message: "Password update failed" });
});


});


