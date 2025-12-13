const User = require("../models/User");
const leaves = require("../models/Leave");
// const request  = require("express");

const request = async (req, res) => {
    try {
        const leaveRequest = await leaves.find().sort({ appliedDate: -1 });


        console.log("DB RESULT:", leaveRequest);  //  MUST SHOW ITEMS

        return res.json({ message: "latest requests", leaveRequest });

    }
    catch (err) {
        console.log("ERROR:", err);
    }
};

// const reject = async (req, res) => {
//     const { Id } = req.params;

//     const update = await leaves.findByIdAndUpdate(
//         Id,
//         { status: "Rejected" },
//         { new: true }
//     );

//     res.status(200).json({ message: "leave rejected successfully",data: update });
// };
module.exports = { request };