const user = require("../models/User");
const leaves = require("../models/Leave");

const status = async(req,res)=>{

    const leavestatus = await leaves.find()
}