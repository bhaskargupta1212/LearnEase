const userModel = require("../user.model");
const db = require("../../config/db");

jest.mock("../../config/db", () => ({
  query: jest.fn(),
}));

describe("User Model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findByEmail", () => {
    test("should call SELECT query with email", (done) => {
      const mockResult = [{ id: 1, email: "test@test.com" }];

      db.query.mockImplementation((sql, values, cb) => {
        expect(sql).toBe("SELECT * FROM users WHERE email = ?");
        expect(values).toEqual(["test@test.com"]);
        cb(null, mockResult);
      });

      userModel.findByEmail("test@test.com", (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        done();
      });
    });

    test("should handle DB error", (done) => {
      db.query.mockImplementation((sql, values, cb) => {
        cb(new Error("DB error"), null);
      });

      userModel.findByEmail("fail@test.com", (err, result) => {
        expect(err).toBeTruthy();
        expect(result).toBeNull();
        done();
      });
    });
  });

  describe("create", () => {
    test("should call INSERT query with user data", (done) => {
      const userData = {
        first_name: "John",
        last_name: "Doe",
        email: "john@test.com",
      };

      db.query.mockImplementation((sql, values, cb) => {
        expect(sql).toBe("INSERT INTO users SET ?");
        expect(values).toEqual(userData);
        cb(null, { insertId: 5 });
      });

      userModel.create(userData, (err, result) => {
        expect(err).toBeNull();
        expect(result.insertId).toBe(5);
        done();
      });
    });

    test("should handle insert error", (done) => {
      db.query.mockImplementation((sql, values, cb) => {
        cb(new Error("Insert failed"), null);
      });

      userModel.create({ email: "fail@test.com" }, (err, result) => {
        expect(err).toBeTruthy();
        expect(result).toBeNull();
        done();
      });
    });
  });
});
