const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db connected ✅");

    }
    catch(err)
    {
        console.error("mongodb error",err);
        process.exit(1);
    }
};
module.exports = connectDB;