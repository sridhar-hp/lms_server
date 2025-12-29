const express = require("express");
const router = express.Router();

const { request } = require("../controllers/requestController");
const { accept, reject } = require("../controllers/actionController");
const { setting, users, deleteUser } = require("../controllers/settingController");

router.get("/request", request);
router.put("/rejection/:id", reject);
router.put("/accept/:id", accept);

router.get("/setting", setting);
router.put("/users/:id", users);
router.put("/dusers/:id", deleteUser);

module.exports = router;
