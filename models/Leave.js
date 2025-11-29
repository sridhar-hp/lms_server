const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  name: String,
  leaveType: String,
  startDate: String,
  endDate: String,
  leaveReason: String
});

module.exports = mongoose.model("leaves", leaveSchema);
