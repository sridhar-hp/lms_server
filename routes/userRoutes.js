import express from "express";
const router = express.Router();
import { apply } from "../controllers/applyController.js";
import  status  from "../controllers/statusController.js";
import { getLeaveBalance } from "../controllers/leaveController.js";
import { leaveSchema } from "../schemas/leave.schema.js";
import { validate } from "../middleware/validate.middleware.js";

router.post("/sapply", validate(leaveSchema),apply);
router.get("/status/:userId", status);
router.get("/leave-balance/:id", getLeaveBalance);

export default router;