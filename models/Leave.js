const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    name: String,
    leaveType: String,
    startDate: Date,
    endDate: Date,
    leaveReason: String,
    duration: Number,
    appliedDate: {
        type: Date,
        required: true
    },
    status: { type: String, default: "Pending" },
    userId: {
        type: String,       
        required: true
    },
});

module.exports = mongoose.model("leaves", leaveSchema);