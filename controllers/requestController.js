const User = require("../models/User");
const leaves = require("../models/Leave");
// const request  = require("express");

const request = async (req, res) => {
  try {
    const leaveRequest = await leaves.find();

    console.log("DB RESULT:", leaveRequest);  //  MUST SHOW ITEMS

    return res.json({ message: "latest requests", leaveRequest });

  }
  catch (err) {
    console.log("ERROR:", err);
  }
};
module.exports = { request };