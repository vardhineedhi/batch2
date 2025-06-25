






const express = require("express");
const { updateUserProfile } = require("../controllers/authcontroller"); // Using from authcontroller
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const User = require("../models/User");

const router = express.Router();

// ✅ Profile Update (Protected)
router.put("/update/:id", protect, updateUserProfile);

// ✅ Admin: Get all users
router.get("/all", protect, isAdmin, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

module.exports = router;
