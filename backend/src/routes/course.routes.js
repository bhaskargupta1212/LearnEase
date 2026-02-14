const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/course.controller");

// public
router.get("/", ctrl.getCourses);
router.get("/:id", ctrl.getCourse);

// admin
router.post("/", auth, ctrl.createCourse);
router.put("/:id", auth, ctrl.updateCourse);
router.delete("/:id", auth, ctrl.deleteCourse);

// student
router.post("/enroll/:id", auth, ctrl.enrollCourse);
router.get("/my-courses", auth, ctrl.myCourses);

module.exports = router;
