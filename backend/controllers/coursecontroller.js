const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create({
      ...req.body,
      C_educator: req.user._id,
    });

    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: "Course creation failed", error: err.message });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
exports.enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const course = await Course.findById(req.params.id);

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can enroll" });
    }

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.enrolled.includes(userId)) {
      return res.status(409).json({ message: "Already enrolled" });
    }

    course.enrolled.push(userId);
    await course.save();
    res.status(200).json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed", error: err.message });
  }
};



// @desc    Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("C_educator", "name email");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

