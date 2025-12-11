const express = require("express");
const router = express.Router();
const {apply} = require("../controllers/applyController");

router.post("/sapply",apply);

module.exports = router;