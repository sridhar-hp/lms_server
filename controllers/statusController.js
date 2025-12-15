const user = require("../models/User");
const leaves = require("../models/Leave");

const status = async(req,res)=>{
    const {userId} = req.params;
    try{
    const leavestatus = await leaves.find({userId});

    res.json({
        success:true,
        leaves:leavestatus
    });
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            leaves:[]
        });
    }
};
module.exports={status};
