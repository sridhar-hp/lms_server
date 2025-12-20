const User = require("../models/User");
const leaves = require("../models/Leave");

/* Leave balance config */
const LEAVE_BALANCE = {
  "Annual Leave": 14,
  "Sick Leave": 8,
  "Casual Leave": 6
};

/* Backend date calculation */
const calculateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const apply = async (req, res) => {
  try {
    const { name, leaveType, startDate, endDate, leaveReason, userId } = req.body;

    /* Validate */
    if (!userId || !leaveType || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    /* Calculate duration */
    const duration = calculateDays(startDate, endDate);

    if (duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid date range"
      });
    }

    /* Validate leave type */
    const allowedDays = LEAVE_BALANCE[leaveType];
    if (!allowedDays) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave type"
      });
    }

    /* Calculate used leave */
    const used = await leaves.aggregate([
      { $match: { userId, leaveType, status: { $ne: "Rejected" } } },
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

    /* Save leave */
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
