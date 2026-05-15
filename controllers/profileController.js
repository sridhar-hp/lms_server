import User from "../models/User.js";

export const getProfile = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({ Id: userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({
            success: true,
            profiledetails: user
        });
        console.log("this is profile :", user);

    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    const userId = req.params.userId;
    const { name, email, phoneNumber } = req.body;

    try {
        const userUpdate = await User.findOneAndUpdate(
            { Id: userId },
            { name, email, phoneNumber },
            {
                new: true,
                runValidators: true
            });

        if (!userUpdate) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedProfile: userUpdate,
        });
    }
    catch (err) {
        console.log("Error updating profile:", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};