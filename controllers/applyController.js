const User = require("../models/User");
const leaves = require("../models/Leave");

const apply = async (req, res) => {
  try {
    const { name, leaveType, startDate, endDate, leaveReason, duration, userId } = req.body;

    await leaves.create({
      name,
      leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      leaveReason,
      duration,
      appliedDate: new Date(),
      userId
    });

    return res.json({ success: true, message: "Leave applied successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { apply };
