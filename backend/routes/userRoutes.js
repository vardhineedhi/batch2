// const express = require("express");
// const { loginUser, registerUser } = require("../controllers/authcontroller");
// const protect = require("../middleware/authMiddleware");
// const isAdmin = require("../middleware/isAdmin"); // ⬅️ Import
// const User = require("../models/User");
// const { updateUserProfile } = require("../controllers/authcontroller");

// const router = express.Router();

// // ✅ Auth Routes
// router.post("/login", loginUser);
// router.post("/register", registerUser);

// // ✅ Only admin can access user list
// router.get("/all", isAdmin, async (req, res) => {
//   const users = await User.find({}, "-password");
//   res.json(users);
// });

// module.exports = router;



const express = require("express");
const {
  loginUser,
  registerUser,
  updateUserProfile,
} = require("../controllers/authcontroller"); // ✅ Get all from authcontroller

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const User = require("../models/User");

const router = express.Router();

// ✅ Auth routes
router.post("/login", loginUser);
router.post("/register", registerUser);

// ✅ Profile update (protected)
router.put("/update/:id", protect, updateUserProfile);

// ✅ Only admin can access all users
router.get("/all", protect, isAdmin, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

module.exports = router;
