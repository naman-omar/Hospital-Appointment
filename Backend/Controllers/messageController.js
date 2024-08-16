import Message from "../models/messageSchema.js"; 

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const newMessage = async (req, res) => {
  try {
    
    const { name, email, subject, message } = req.body;
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};
