import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
import messageRoute from "./Routes/message.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOption = {
  origin: true,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database connection falied!");
  }
};

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/doctors", doctorRoute);
app.use("/reviews", reviewRoute);
app.use("/bookings", bookingRoute);
app.use("/messages", messageRoute);

app.listen(port, () => {
  connectDB();
  console.log(`server is listening to the port ${port}`);
});
