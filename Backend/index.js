import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

const app = express();
const port = process.env.PORT || 8080

const corsOption = {
    origin: true
}

app.get("/",(req,res)=>{
    res.send("Api is working")
});

mongoose.set("strictQuery",false)
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection falied!")
    }
}

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption))

app.listen(port, () => {
    connectDB();
    console.log(`server is listening to the port ${port}`);
})
