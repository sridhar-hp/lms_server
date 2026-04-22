import User from "../models/User.js";

const setting = async (req, res) => {
    try {
        const users = await User.find();
        return res.json({ success: true, message: "all user list", users });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Unable to fetch users" });
    }
};

const users = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const ssave = await User.findByIdAndUpdate(
            id,
            updatedData,
            { new: true,
              runValidators: true
             }
        );
        res.json({
            success: true,
            message: "user updated successfully",
            user: ssave
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Unable to update user" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully",
            user: deletedUser
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

export { setting, users, deleteUser };