const Chat = require("../models/chatbot");

const chat = async (req, res) => {
  try {
    console.log(res);
    const newChat = new Chat(req.body);
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (err) {
    res.status(500).json({ error: "Failed to save chat message" });
  }
};

exports.chat = chat
