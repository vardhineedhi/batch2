const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isTeacherOrAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !["teacher", "admin"].includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token", error: err.message });
  }
};

module.exports = isTeacherOrAdmin;
