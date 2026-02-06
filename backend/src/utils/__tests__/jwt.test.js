const jwtLib = require("jsonwebtoken");
const jwtUtil = require("../jwt");

jest.mock("jsonwebtoken");

describe("JWT Utils", () => {

  test("generateToken calls jwt.sign", () => {
    jwtLib.sign.mockReturnValue("mock_token");

    const token = jwtUtil.generateToken({ id: 1 });

    expect(jwtLib.sign).toHaveBeenCalledWith(
      { id: 1 },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    expect(token).toBe("mock_token");
  });

  test("verifyToken calls jwt.verify", () => {
    jwtLib.verify.mockReturnValue({ id: 1 });

    const data = jwtUtil.verifyToken("abc");

    expect(jwtLib.verify).toHaveBeenCalledWith(
      "abc",
      process.env.JWT_SECRET
    );

    expect(data).toEqual({ id: 1 });
  });

});
