// Mock db
jest.mock("../../config/db", () => ({
  query: jest.fn(),
}));

// Mock slugify
jest.mock("slugify", () => jest.fn());

const db = require("../../config/db");
const slugify = require("slugify");
const Course = require("../course.model");

describe("Course Model Tests", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------
  // getAll
  // -------------------------
  test("getAll should call db.query with correct SQL", () => {
    const cb = jest.fn();

    Course.getAll(cb);

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM courses ORDER BY id DESC",
      cb
    );
  });

  // -------------------------
  // getById
  // -------------------------
  test("getById should call db.query with id", () => {
    const cb = jest.fn();

    Course.getById(5, cb);

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM courses WHERE id = ?",
      [5],
      cb
    );
  });

  // -------------------------
  // create
  // -------------------------
  test("create should generate slug and insert course", () => {
    const cb = jest.fn();

    slugify.mockReturnValue("test-slug");

    const data = {
      title: "Test Course",
      description: "Desc",
      category: "Web",
      price: 100,
      thumbnail: "img.jpg",
      created_by: 1,
    };

    Course.create(data, cb);

    expect(slugify).toHaveBeenCalled();

    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO courses"),
      [
        data.title,
        "test-slug",
        data.description,
        data.category,
        data.price,
        data.thumbnail,
        data.created_by,
      ],
      cb
    );
  });

  // -------------------------
  // update
  // -------------------------
  test("update should call db.query with correct params", () => {
    const cb = jest.fn();

    Course.update(10, { title: "Updated" }, cb);

    expect(db.query).toHaveBeenCalledWith(
      "UPDATE courses SET ? WHERE id = ?",
      [{ title: "Updated" }, 10],
      cb
    );
  });

  // -------------------------
  // remove
  // -------------------------
  test("remove should call db.query with id", () => {
    const cb = jest.fn();

    Course.remove(7, cb);

    expect(db.query).toHaveBeenCalledWith(
      "DELETE FROM courses WHERE id = ?",
      [7],
      cb
    );
  });

  // -------------------------
  // enroll
  // -------------------------
  test("enroll should insert into enrollments", () => {
    const cb = jest.fn();

    Course.enroll(2, 3, cb);

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)",
      [2, 3],
      cb
    );
  });

  // -------------------------
  // getUserCourses
  // -------------------------
  test("getUserCourses should join courses and enrollments", () => {
    const cb = jest.fn();

    Course.getUserCourses(4, cb);

    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining("JOIN enrollments"),
      [4],
      cb
    );
  });

});
