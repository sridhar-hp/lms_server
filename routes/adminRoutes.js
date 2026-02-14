// const express = require("express");
import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import request from "../controllers/requestController.js";
import { accept, reject } from "../controllers/actionController.js";
import {
  setting,
  users,
  deleteUser,
} from "../controllers/settingController.js";

router.get("/request",protect, request);
router.put("/rejection/:id",protect, reject);
router.put("/accept/:id",protect, accept);

router.get("/setting",protect, setting);
router.put("/users/:id",protect, users);
router.put("/dusers/:id",protect, deleteUser);

export default router;
