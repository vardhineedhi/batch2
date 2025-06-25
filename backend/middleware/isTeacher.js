const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isTeacher = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || (user.role !== "teacher" && user.role !== "admin")) {
      return res.status(403).json({ message: "Only teachers or admins can access this." });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token", error: err.message });
  }
};

module.exports = isTeacher;
