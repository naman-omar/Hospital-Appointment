import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message Must Contain At Least 10 Characters!"],
  },
});

export default mongoose.model("Message", MessageSchema);