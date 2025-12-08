const user = require("../models/User");
const leaves = require("../models/Leave");

const reject = async (req, res) => {
    const { Id } = req.params.id;

    const update = await leaves.findByIdAndUpdate(
        Id,
        { status: "Rejected" },
        { new: true }
    );

    res.status(200).json({ message: "leave rejected successfully",data: update });
}
module.exports = { reject };