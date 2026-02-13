import leaves from "../models/Leave.js";

const request = async (req, res) => {
    try {
        const leaveRequest = await leaves.find().sort({ appliedDate: -1 });

        console.log("DB RESULT:", leaveRequest);  //  MUST SHOW ITEMS

        return res.json({ message: "latest requests", leaveRequest });

    }
    catch (err) {
        
  console.error("REGISTER ERROR:", err);  // 👈 VERY IMPORTANT
  res.status(500).json({ success: false, message: err.message });
    }
};

export default request;