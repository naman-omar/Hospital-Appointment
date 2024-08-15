import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const genToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

export const register = async (req, res) => {
  const { name, email, password, photo, role, gender } = req.body;
  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    //check if user exist
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        role,
        gender,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        role,
        gender,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    //check if user exists or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    //generate token
    const token = genToken(user);

    const { password, role, appointments, ...rest } = user._doc;
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully Login",
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    // Check if user exists or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ status: false, message: "Invalid Credentials" });
    }

    // Check if the user's role is 'admin'
    if (user.role !== "admin") {
      return res.status(403).json({ status: false, message: "Unauthorized access. Admins only." });
    }

    // Generate token
    const token = genToken(user);

    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Successfully Logged In as Admin",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Admin login failed" });
  }
};

export const addAdmin = async (req, res) => {
  const { email, name } = req.body;

  try {
    let user = null;
    const patient = await User.findOne({ email, name });
    const doctor = await Doctor.findOne({ email, name });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(user.role === "admin"){
      return res.status(200).json({ success: true, message: "Already a admin" });
    }
    user.role = "admin";
    await user.save();
    return res.status(200).json({ success: true, message: "User role updated to admin", data: user });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
