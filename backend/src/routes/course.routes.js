const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const ctrl = require("../controllers/course.controller");

/* ================= ADMIN ================= */

// create course (admin only)
router.post("/", auth, role(["admin"]), ctrl.createCourse);

// update
router.put("/:id", auth, role(["admin"]), ctrl.updateCourse);

// delete
router.delete("/:id", auth, role(["admin"]), ctrl.deleteCourse);


/* ================= PUBLIC ================= */

router.get("/", ctrl.getCourses);

/* ================= STUDENT ================= */
router.get("/my-courses", auth, ctrl.myCourses);
router.post("/enroll/:id", auth, ctrl.enrollCourse);

router.get("/:id", ctrl.getCourse);



module.exports = router;
