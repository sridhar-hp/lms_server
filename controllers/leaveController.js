const User = require("../models/User");

const getLeaveBalance = async (req, res) => {
    try {
        const user = await User.findOne({ Id: req.params.id });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            leaveBalance: user.leaveBalance
        });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({ success: false });
    }
};

module.exports = { getLeaveBalance };
