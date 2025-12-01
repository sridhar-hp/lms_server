const User = require("../models/User");
const leaves = require("../models/Leave");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GiLeatherVest } = require("react-icons/gi");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.request = async (req, res) => {
  try {
    const leaveRequest = await leaves.find();
    console.log("DB RESULT:", leaveRequest);  // ➤ MUST SHOW ITEMS
    return res.json({ message: "latest requests", leaveRequest });
  } catch (err) {
    console.log("ERROR:", err);
  }
};
 

exports.apply= async(req, res)=>{
  try{
    const {name, leaveType, startDate, endDate, leaveReason}=req.body;
    
    await leaves.create({name, leaveType, startDate, endDate, leaveReason});
    return res.json({success:true, message:"Leave applied successfully!" });

  }
  catch(err)
  {
    console.log(err);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { Id, password, role } = req.body;

    if (!Id || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const exists = await User.findOne({ Id });
    if (exists)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ Id, password: hashed, role });

    return res.json({ success: true, message: "Registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { Id, password } = req.body;

  if (!Id || !password) {
    return res.status(400).json({ message: "ID or Password missing" });
  }

  try {
    // Find user by Id
    const user = await User.findOne({ Id });
    if (!user) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Validate password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Wrong Password" });
    // }
    // TEMPORARY — for testing only
if (password != user.password) {
  return res.status(400).json({ message: "Wrong Password" });
}


    // Success
    res.status(200).json({ success: true,  message: "Login Successful", user,Role:user.role });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};



exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};

exports.me = (req, res) => {
  res.json({ success: true, user: req.user });
};
