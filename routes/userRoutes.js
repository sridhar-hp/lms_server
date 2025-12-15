const express = require("express");
const router = express.Router();
const {apply} = require("../controllers/applyController");
const {status}= require("../controllers/statusController");

router.post("/sapply",apply);
router.get("/status/:userId",status);

module.exports = router;