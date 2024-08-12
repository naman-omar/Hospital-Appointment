import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  //get token from headers
  const authToken = req.headers.authorization;

  //check if the token exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded",decoded);
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    if (err === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "You are not authorized" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user;
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);
  if (patient) {
    user = patient;
  } else {
    user = doctor;
  }
  if (user.role && !roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }
  next();
};
