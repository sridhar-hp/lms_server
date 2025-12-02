const User = require("../models/User");
const leaves = require("../models/Leave");

exports.apply = async (req, res) => {
    try {
        const { name, leaveType, startDate, endDate, leaveReason } = req.body;

        await leaves.create({ name, leaveType, startDate, endDate, leaveReason});
        return res.json({ success: true, message: "Leave applied successfully!" });

    }
    catch (err) {
        console.log(err);
    }
};