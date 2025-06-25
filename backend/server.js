// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect DB
// connectDB();

// // API Routes

// app.use("/api/users", require("./routes/userRoutes")); // ✅ User profile + admin access
// app.use("/api/courses", require("./routes/courseRoutes")); // ✅ Course routes

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// ✅ Clean, final routes
app.use("/api/users", require("./routes/userRoutes"));  // All user-related routes
app.use("/api/courses", require("./routes/courseRoutes")); // Course routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
