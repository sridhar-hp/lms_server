// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());

// //connect to mongodb 
// mongoose.connect("mongodb://127.0.0.1:27017/lms")
//  .then(()=> console.log("mongodb connected✅"))
//  .catch((err) => console.log("mongodb error:",err));

//  app.get("/",(req,res)=>{
//     res.send("server running... by sridhar");
//  });

//  app.post("/login", async(req,res)=>{
//     const {Id,pass}=req.body;

//     const user = await User.findOne({Id,pass});
//  if (!user) {
//     return res.json({ success: false, message: "Invalid email" });
// }

// if (password !== user.password) {
//     return res.json({ success: false, message: "Wrong password" });
// }


// return res.json({ success: true, message: "Login success" });
// });
//  app.listen(5000,()=>{
//     console.log("server running in port 5000");
//  });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Enable CORS for React frontend
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
}));

app.use(express.json());

// ---------- MongoDB Connection ----------
mongoose.connect("mongodb://127.0.0.1:27017/lms")
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("MongoDB Error:", err));

// ---------- User Model ----------
const User = mongoose.model("User", new mongoose.Schema({
    Id: String,
    pass: String
}));

// ---------- Routes ----------
app.get("/", (req, res) => {
    res.send("Server running... by Sridhar");
});

app.post("/login", async (req, res) => {
    const { id, pass } = req.body; // frontend sends lowercase id,pass

    const user = await User.findOne({ Id: id });

    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }

    if (pass !== user.pass) {
        return res.json({ success: false, message: "Wrong password" });
    }

    return res.json({ success: true, message: "Login success", user });
});

// ---------- Server ----------
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
