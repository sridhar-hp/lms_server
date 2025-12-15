const user = require("../models/User");
const leaves = require("../models/Leave");

const reject = async (req, res) => {
    const { id } = req.params;

    const update = await leaves.findByIdAndUpdate(
        id,
        { status: "Rejected" },
        { new: true }
    );

    res.json({ success:true , message: "leave rejected successfully",data: update });
};

const accept = async(req, res)=>{
    const {id}=req.params;

    const acc = await leaves.findByIdAndUpdate(
        id,
        {status:"Approved"},
        {new:true}

    );
    res.json({success:true, messae:"leave accepted successfully",data:acc});
}
module.exports = { reject,accept };