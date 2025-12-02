const express = require("express");
const router = express.Router();
  const {registerUser,loginUser,logoutUser} = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// router.get("/dashboard", verifyToken, (req, res) => {
//   res.json({ success: true, message: "Dashboard", user: req.user });
// });

// router.get("/me", verifyToken, authController.me);

module.exports = router;
