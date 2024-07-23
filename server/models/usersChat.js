const mongoose = require("mongoose");

const UsersChat = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UsersChat", UsersChat);
