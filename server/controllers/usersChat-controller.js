const UsersChat = require("../models/usersChat");

const chat = async (req, res) => {
  const { userId, quesId } = req.body;

  try {
    const savedChat = await UsersChat.findOneAndUpdate(
      { userId },
      { $set: { quesId } },
      { new: true, upsert: true }
    );

    res.status(201).json(savedChat);
  } catch (err) {
    res.status(500).json({ error: "Failed to save or update user's chat" });
  }
};

const getChat = async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;
  try {
    const savedChat = await UsersChat.findOne({ userId });
    res.status(200).json(savedChat);
  } catch (err) {
    res.status(500).json({ error: "Failed to get user's chat" });
  }
};

exports.chat = chat;
exports.getChat = getChat;
