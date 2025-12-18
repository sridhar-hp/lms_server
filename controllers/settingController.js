const user = require("../models/User");
const leave = require("../models/Leave");

const setting = async(req ,res)=>{
    try{
        const users = await user.find();
        return res.json({success: true , message:"all user list",users});
    }
    catch(err)
    {
        console.log(err);
    }
};

const users= async(req,res)=>{
    try{
        const {id}=req.params;
        const updatedData= req.body;
        const ssave = await user.findByIdAndUpdate(
            id,
            updatedData,
            {new:true}            
        );
        res.json({
            success:true,
            message:"user updated successfully",
            ssave
        });
    }
    catch(err)
    {
        console.log(err);
    }
};
module.exports={setting,users};