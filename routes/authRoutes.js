import express from "express";
const router = express.Router();
import { registerUser,loginUser,logoutUser } from "../controllers/authController.js";
import verifyToken from "../middleware/auth.js";
import { loginSchema } from '../schemas/auth.schema.js';
import { registerSchema } from "../schemas/register.schema.js";
import { validate } from '../middleware/validate.middleware.js';

router.post("/register",validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);

export default router;
