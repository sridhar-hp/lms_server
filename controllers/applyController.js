const User = require("../models/User");
const leaves = require("../models/Leave");

exports.apply = async (req, res) => {

    try {

        const { name, leaveType, startDate, endDate, leaveReason,duration } = req.body;

        const today = new Date();
        const DD = String(today.getDate()).padStart(2,"0");
        const MM = String(today.getMonth()+1).padStart(2,"0");
        const YYYY = today.getFullYear();
        const appliedDate=`${DD}-${MM}-${YYYY}`;

        await leaves.create({ name, leaveType, startDate, endDate, leaveReason,duration,appliedDate});
        return res.json({ success: true, message: "Leave applied successfully!" });

    }
    catch (err) {
        console.log(err);
    }
};