// const mongoose = require("mongoose");

// const leaveSchema = new mongoose.Schema({
//     userId: { type: String, required: true }, 
//     role: { type: String, required: true },
//     name: { type: String, required: true },
//     leaveType: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     leaveReason: { type: String, required: true },
//     appliedDate: { type: Date, default: Date.now },
//     status: { type: String, default: "Pending" }
// });

// module.exports = mongoose.model("leaves", leaveSchema);
const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    name: String,
    leaveType: String,
    startDate: Date,
    endDate: Date,
    leaveReason: String,
    // days: String,
    duration: Number,
    appliedDate: {
        type: Date,
        // default: Date.now 
        required: true
    },
    status: { type: String, default: "Pending" },
    userId: {
        type: String,        // ← ADD THIS
        required: true
    },
});

module.exports = mongoose.model("leaves", leaveSchema);