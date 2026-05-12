import User from "../models/User.js";

export const getProfile = async (req, res) => {
    const userId= req.params.userId;
    try{
        const user = await User.findOne({Id: userId});
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({
            success: true,
            profiledetails: user
        }); 
        console.log("this is profile :", user);

    }
    catch(err){
        res.status(500).json({ success: false, message: "Server error" });
    }
};