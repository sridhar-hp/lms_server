import User from "../models/User.js";
import leaves from "../models/Leave.js";

// const calculateDays = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const diffTime = endDate - startDate;
//     return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
// };

const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // ✅ Normalize to same timezone (remove time)
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffTime = endDate - startDate;
    const duration = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    console.log({
        startDate,
        endDate,
        duration
    });

    return duration;

};

export const apply = async (req, res) => {
    const userId = req.user.Id;
    const role = req.user.role;
    try {
        const { name, leaveType, startDate, endDate, leaveReason } = req.body;
        console.log("APPLY LEAVE BODY:", req.body);

        if (!userId || !leaveType || !startDate || !endDate) {
            console.log("ERROR: Missing fields");
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
                received: { userId, leaveType, startDate, endDate }
            });
        }

        const duration = calculateDays(startDate, endDate);

        if (duration <= 0) {
            console.log("ERROR: Invalid duration", duration);
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
            console.log("ERROR: Invalid leave type", leaveType, user.leaveBalance);
            return res.status(400).json({
                success: false,
                message: "Invalid leave type"
            });
        }

        const used = await leaves.aggregate([
            { $match: { userId, leaveType, status: "Approved" } },
            { $group: { _id: null, total: { $sum: "$duration" } } }
        ]);

        // const usedDays = used[0]?.total || 0;
        // const remainingDays = allowedDays - usedDays;

        // console.log("DEBUG VALUES:", {
        //     leaveType,
        //     allowedDays,
        //     usedDays,
        //     remainingDays,
        //     duration
        // });

        // if (duration > remainingDays) {
        //     console.log("ERROR: Balance issue", {
        //         duration,
        //         allowedDays,
        //         usedDays,
        //         remainingDays
        //     });
        //     return res.status(400).json({
        //         success: false,
        //         message: `Insufficient leave balance. Remaining: ${remainingDays} days`
        //     });
        //}

        const usedDays = used[0]?.total || 0;
        const remainingDays = allowedDays - usedDays;

        // 🔥 Allow apply, but limit per request
        if (duration > allowedDays) {
            return res.status(400).json({
                success: false,
                message: `You can only apply up to ${allowedDays} days at once`
            });
        }

        // ⚠️ Warning only (no blocking)
        if (remainingDays < 0) {
            console.log("⚠️ Overused leave:", {
                usedDays,
                allowedDays
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
            message: "Leave applied successfully", userId, role
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// export default apply;