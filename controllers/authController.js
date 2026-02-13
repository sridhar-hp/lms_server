import User from "../models/User.js";   
import leaves from "../models/Leave.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GiLeatherVest } from "react-icons/gi";

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
    try {

        const { name, Id, password, role, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(name, Id, password, role, email, hashedPassword);

        await User.create({ name, Id, password:hashedPassword, role, email });
        return res.json({ success: true, message: "new user is created" });


    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    const { Id, password } = req.body;

    if (!Id || !password) {
        return res.status(400).json({ message: "ID or Password missing" });
    }

    try {
        const user = await User.findOne({ Id });
        if (!user) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "invalid password" });
        }

        // now i goo to create a token for the user

        const token=jwt.sign({ Id: user.Id, role: user.role },process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN });
       
        // SEND THE TOKE TO FROTNEND
        res.json({message:"login successful", token, user: {Id: user.Id, role: user.role, name: user.name} });

        // if (password != user.password) {
        //     return res.status(400).json({ message: "Wrong Password" });
        // }

       // res.status(200).json({ success: true, message: "Login Successful", user, Role: user.role, Id: user.Id });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out" });
};


// module.exports = { registerUser, loginUser, logoutUser };
export { registerUser, loginUser, logoutUser };
