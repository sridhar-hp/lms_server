const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }   // FIXED
});

module.exports = mongoose.model("User", userSchema);
