const User = require("../models/User");
const leaves = require("../models/Leave");

function formatDate(d) {
    const dt = new Date(d);
    const DD = String(dt.getDate()).padStart(2, "0");
    const MM = String(dt.getMonth() + 1).padStart(2, "0");
    const YYYY = dt.getFullYear();
    return `${DD}-${MM}-${YYYY}`;
}

exports.apply = async (req, res) => {

    try {

        const { name, leaveType, startDate, endDate, leaveReason, duration, userId } = req.body;

        const cleanStartDate = formatDate(startDate);
        const cleanEndDate = formatDate(endDate);

        const today = new Date();
        const DD = String(today.getDate()).padStart(2, "0");
        const MM = String(today.getMonth() + 1).padStart(2, "0");
        const YYYY = today.getFullYear();
        const appliedDate = `${DD}-${MM}-${YYYY}`;

        await leaves.create({
            name,
            leaveType,
            startDate: cleanStartDate,
            endDate: cleanEndDate,
            leaveReason,
            duration,
            appliedDate,
            userId
        });

        return res.json({ success: true, message: "Leave applied successfully!" });

    }
    catch (err) {
        console.log(err);
    }
};