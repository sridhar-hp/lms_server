const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Id: { type: String, required: true, unique: true },
  name:{type:String, required: true},
  email:{type:String, required: true, unique:true},
  password: { type: String, required: true },
  role: { type: String ,default: null }   // FIXED
});

module.exports = mongoose.model("User", userSchema);
