const express = require("express");
const router = express.Router();
const {request} = require("../controllers/requestController");
const {reject}=require("../controllers/rejectionController");

router.get("/request",request);
router.put("/rejection/:id",reject);

module.exports = router;

