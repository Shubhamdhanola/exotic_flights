const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  type: String,
  text: String,
  level: Number,
  answerText: String,
  nextChats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  parentChat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', ChatSchema);