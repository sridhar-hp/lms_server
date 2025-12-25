const User = require("../models/User");
const leaves = require("../models/Leave");

async function reject(req, res) {
  try {
    const { id } = req.params;

    const leave = await leaves.findById(id);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    if (leave.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Leave already processed"
      });
    }

    leave.status = "Rejected";
    await leave.save();

    res.json({
      success: true,
      message: "Leave rejected successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
}


async function accept(req, res) {
  try {
    const { id } = req.params;

    const leave = await leaves.findById(id);
    
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    if (leave.status === "Approved") {
      return res.json({ success: false, message: "Already approved" });
    }

    const user = await User.findOne({ Id: leave.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.leaveBalance[leave.leaveType] === undefined) {
      return res.status(400).json({
        success: false,
        message: `Leave type "${leave.leaveType}" not configured`
      });
    }

if (user.leaveBalance[leave.leaveType] < leave.duration) {
  return res.status(400).json({
    success: false,
    message: "Insufficient leave balance"
  });
}

      user.leaveBalance[leave.leaveType] -= leave.duration;
      user.markModified("leaveBalance");
    await user.save();

    leave.status = "Approved";
    await leave.save();

    return res.json({
      success: true,
      message: "Leave approved and balance updated"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
}

module.exports = {
  reject,
  accept
};
