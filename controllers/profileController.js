import User from "../models/User.js";

export const getProfile = async (req, res) => {
    const userId = req.user?.Id || req.params.userId;
    try {
        const user = await User.findOne({ Id: userId }).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({
            success: true,
            profiledetails: user
        });
    } catch (err) {
        console.error("Error getting profile:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    const userId = req.user?.Id || req.params.userId;
    const { name, email, phoneNumber, department, designation } = req.body;

    try {
        const userUpdate = await User.findOneAndUpdate(
            { Id: userId },
            { name, email, phoneNumber, department, designation },
            {
                new: true,
                runValidators: true
            }).select("-password");

        if (!userUpdate) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedProfile: userUpdate,
        });
    } catch (err) {
        console.log("Error updating profile:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const uploadProfileImage = async (req, res) => {
    const userId = req.user?.Id;
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    try {
        const profileImagePath = `/uploads/${req.file.filename}`;
        const userUpdate = await User.findOneAndUpdate(
            { Id: userId },
            { profileImage: profileImagePath },
            { new: true }
        ).select("-password");

        if (!userUpdate) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            profileImage: profileImagePath,
            updatedProfile: userUpdate,
        });
    } catch (err) {
        console.error("Error uploading profile image:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};