import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { apply } from "../controllers/applyController.js";
import status from "../controllers/statusController.js";
import { getLeaveBalance } from "../controllers/leaveController.js";
import { leaveSchema } from "../schemas/leave.schema.js";
import { profileSchema } from "../schemas/profile.schema.js";
import { validate } from "../middleware/validate.middleware.js";
import { getProfile, updateProfile, uploadProfileImage } from "../controllers/profileController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFolder = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      fs.mkdirSync(uploadFolder, { recursive: true });
    } catch (err) {
      // ignore if folder already exists
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `profile-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post("/sapply", protect,validate(leaveSchema), apply);
router.get("/status/:userId",protect, status);
router.get("/leave-balance/:id",protect, getLeaveBalance);
router.get("/profile", protect, getProfile);
router.get("/profile/:userId", protect, getProfile);
router.put("/profile", protect, validate(profileSchema), updateProfile);
router.put("/profileupdate/:userId", protect, validate(profileSchema), updateProfile);
router.post("/profile/image", protect, upload.single("profileImage"), uploadProfileImage);

export default router;