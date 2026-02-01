// const express = require("express");
import express from "express";

const router = express.Router();

import request from "../controllers/requestController.js";
import { accept, reject } from "../controllers/actionController.js";
import {
  setting,
  users,
  deleteUser,
} from "../controllers/settingController.js";

router.get("/request", request);
router.put("/rejection/:id", reject);
router.put("/accept/:id", accept);

router.get("/setting", setting);
router.put("/users/:id", users);
router.put("/dusers/:id", deleteUser);

export default router;
