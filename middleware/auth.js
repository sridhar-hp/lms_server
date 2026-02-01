import jwt from "jsonwebtoken";
//no use
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token, unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user data
        next(); // move to next middleware / controller
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};

export default authMiddleware;
