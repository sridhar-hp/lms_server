const express = require("express");
const router = express.Router();
const {request} = require("../controllers/requestController");
const {reject}=require("../controllers/actionController");
const {accept}=require("../controllers/actionController");
const {setting}=require("../controllers/settingController");
const {users}= require("../controllers/settingController");

router.get("/request",request);
router.put("/rejection/:id",reject);
router.put("/accept/:id",accept);
router.get("/setting",setting)
router.put("/users/:id",users);

module.exports = router;

