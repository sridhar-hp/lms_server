const User = require("../models/User");
const leaves = require("../models/Leave");

const calculateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const apply = async (req, res) => {
  try {
    const { name, leaveType, startDate, endDate, leaveReason, userId } = req.body;
    console.log("APPLY LEAVE BODY:", req.body);

    if (!userId || !leaveType || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
        received: { userId, leaveType, startDate, endDate }
      });
    }

    const duration = calculateDays(startDate, endDate);

    if (duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid date range"
      });
    }

    const user = await User.findOne({ Id: userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const allowedDays = user.leaveBalance[leaveType];
    if (allowedDays === undefined) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave type"
      });
    }

    const used = await leaves.aggregate([
      { $match: { userId, leaveType, status: "Approved" } },
      { $group: { _id: null, total: { $sum: "$duration" } } }
    ]);

    const usedDays = used[0]?.total || 0;
    const remainingDays = allowedDays - usedDays;

    if (duration > remainingDays) {
      return res.status(400).json({
        success: false,
        message: `Insufficient leave balance. Remaining: ${remainingDays} days`
      });
    }

    await leaves.create({
      name,
      leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      leaveReason,
      duration,
      appliedDate: new Date(),
      status: "Pending",
      userId
    });

    res.json({
      success: true,
      message: "Leave applied successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = { apply };