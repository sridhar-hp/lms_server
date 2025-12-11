const express = require("express");
const router = express.Router();
const {request} = require("../controllers/requestController");
const {reject}=require("../controllers/actionController");
const {accept}=require("../controllers/actionController");

router.get("/request",request);
router.put("/rejection/:id",reject);
router.put("/accept/:id",accept);

module.exports = router;

