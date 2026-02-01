import express from "express";
const router = express.Router();
import { apply } from "../controllers/applyController.js";
import  status  from "../controllers/statusController.js";
import { getLeaveBalance } from "../controllers/leaveController.js";

router.post("/sapply", apply);
router.get("/status/:userId", status);
router.get("/leave-balance/:id", getLeaveBalance);

export default router;