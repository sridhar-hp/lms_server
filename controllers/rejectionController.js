const user = require("../models/User");
const leaves = require("../models/Leave");

const reject = async(req , res)=>{
    const id = req.params.id;


    const rej = await leaves.updateOne()


}
module.exports={reject};