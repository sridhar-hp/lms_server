const express = require("express");
const router = express.Router();
const { apply } = require("../controllers/applyController");
const { status } = require("../controllers/statusController");
const { getLeaveBalance } = require("../controllers/leaveController")

router.post("/sapply", apply);
router.get("/status/:userId", status);
router.get("/leave-balance/:id", getLeaveBalance);

module.exports = router;