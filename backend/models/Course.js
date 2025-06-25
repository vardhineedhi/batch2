const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  C_educator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  C_categories: String,
  C_title: String,
  C_description: String,
  sections: [String],
  C_price: Number,
  C_video: String,              // ✅ Add this line
  C_certificate: {              // ✅ And this one
    type: Boolean,
    default: false,
  },
  enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Course", courseSchema);
