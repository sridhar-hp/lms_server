const user = require("../models/User");
const leave = require("../models/Leave");

const setting = async(req ,res)=>{
    try{
        const users = await user.find();
        return res.json({message:"all user list",users});
    }
    catch(err)
    {
        console.log(err);
    }
};
module.exports={setting};