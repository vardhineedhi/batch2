const express = require("express");
const {
  createCourse,
  getAllCourses,
  enrollInCourse,
  deleteCourse
} = require("../controllers/coursecontroller");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const isTeacherOrAdmin = require("../middleware/isTeacherOrAdmin");

const router = express.Router();

// 🟢 Anyone can view courses
router.get("/", getAllCourses);

// ✅ Teachers and Admins can add courses
router.post("/add", isTeacherOrAdmin, createCourse);

// 🔴 Only Admin can delete courses
router.delete("/:id", isAdmin, deleteCourse);

// 🟢 Only Students can enroll
router.post("/enroll/:id", protect, enrollInCourse);

module.exports = router;
