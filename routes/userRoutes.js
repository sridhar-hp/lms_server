import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { apply } from "../controllers/applyController.js";
import status from "../controllers/statusController.js";
import { getLeaveBalance } from "../controllers/leaveController.js";
import { leaveSchema } from "../schemas/leave.schema.js";
import { validate } from "../middleware/validate.middleware.js";

router.post("/sapply", protect,validate(leaveSchema), apply);
router.get("/status/:userId",protect, status);
router.get("/leave-balance/:id",protect, getLeaveBalance);

export default router;