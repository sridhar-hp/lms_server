const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ success: true, message: "Dashboard", user: req.user });
});

router.get("/me", verifyToken, authController.me);

module.exports = router;
