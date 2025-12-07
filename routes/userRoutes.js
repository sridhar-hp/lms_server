const express = require("express");
const router = express.Router();
const applyController = require("../controllers/applyController");

router.post("/sapply",applyController.apply);

module.exports = router;