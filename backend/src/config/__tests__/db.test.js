/* ---------------- MOCK MYSQL ---------------- */
jest.mock("mysql2", () => ({
  createPool: jest.fn(() => "MOCK_POOL"),
}));

describe("Database Config", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // important -> reload module with new env
    process.env = {
      ...OLD_ENV,
      DB_HOST: "localhost",
      DB_USER: "root",
      DB_PASS: "password",
      DB_NAME: "testdb",
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("creates mysql pool with correct config", () => {
    const mysql = require("mysql2");
    const db = require("../db");

    expect(mysql.createPool).toHaveBeenCalledWith({
      host: "localhost",
      user: "root",
      password: "password",
      database: "testdb",
    });

    expect(db).toBe("MOCK_POOL");
  });

  test("handles missing env variables", () => {
    process.env.DB_HOST = undefined;
    process.env.DB_USER = undefined;
    process.env.DB_PASS = undefined;
    process.env.DB_NAME = undefined;

    const mysql = require("mysql2");
    const db = require("../db");

    expect(mysql.createPool).toHaveBeenCalledWith({
      host: undefined,
      user: undefined,
      password: undefined,
      database: undefined,
    });

    expect(db).toBe("MOCK_POOL");
  });
});
