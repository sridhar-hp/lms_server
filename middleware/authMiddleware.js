import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findOne({ Id: decoded.Id }).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next(); // ✅ allow request
        } catch (error) {
            console.log("JWT ERROR:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export { protect };
