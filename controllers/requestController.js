import leaves from "../models/Leave.js";

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

export default request;