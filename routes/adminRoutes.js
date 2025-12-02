const express = require("express");
const router = express.Router();
const {request} = require("../controllers/requestController");

router.get("/request",request);

module.exports = router;

