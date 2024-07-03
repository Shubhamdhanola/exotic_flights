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

const addQuestion = async (req, res) => {
  const { text, level, answerText, nextChats, parentChat } = req.body

  try {

    const newChat = new Chat({
      type: 'question',
      level: level,
      text: text,
      answerText: answerText,
      nextChats: nextChats ? [...nextChats] : null,
      parentChat: parentChat
    })
    
    if(parentChat) {
      let chat = await Chat.findById(parentChat)
      
      if(!chat) {
        res.status(400).json({ error: "Parent Question Not Found" });
      }
      
      if(!chat.nextChats) {
        chat.nextChats = [newChat._id]
      } else {
        chat.nextChats = [...chat.nextChats, newChat._id]
      }

      if(!chat.save()) {
        res.status(400).json("Something's Wrong");
      }
    }

    const savedChat = await newChat.save()
    res.status(201).json(savedChat);

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to save chat message" });
  }
}

const updateQuestion = async (req, res) => {
  const chatId = req.params.id
  const { text, level, answerText, nextChats, type, parentChat } = req.body

  let chat;
  try {
    chat = await Chat.findById(chatId)
    if(!chat) {
      res.status(400).json({ error: "Failed to find chat" });
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Failed to find chat" });
  }

  try {
    chat.text = text ? text : ''
    chat.level = level ? level : ''
    chat.answerText = answerText ? answerText : ''
    chat.nextChats = nextChats ? nextChats : null
    chat.type = type ? type : ''

    let oldParentChatId = chat.parentChat ? chat.parentChat.toString() : ''
    
    if(parentChat && oldParentChatId != parentChat.toString()) {
      // update next chats from old parent chat
      if(oldParentChatId) {
        let oldParentChatObject = await Chat.findById(oldParentChatId)
        
        if(oldParentChatObject) {
          let parentNextChats = oldParentChatObject.nextChats && oldParentChatObject.nextChats.filter(item => item.toString() != chat.id )
  
          if(parentNextChats) {
            oldParentChatObject.nextChats = parentNextChats
          } else {
            oldParentChatObject.nextChats = []
          }
          
          if(oldParentChatObject.save()) {
            chat.parentChat = parentChat
          } else {
            res.status(500).json({ error: "Something's Wrong" });
          }
        }
      }

      // update next chats from new parent chat
      let newParentChatObject = await Chat.findById(parentChat.toString())

      if(newParentChatObject) {
        if(newParentChatObject.parentChat && newParentChatObject.parentChat.toString() == chat.id) {
          newParentChatObject.parentChat = null
        }
        
        let parentNextChats = newParentChatObject.nextChats
        if(!parentNextChats) {
          newParentChatObject.nextChats = [chat.id]
        } else {
          newParentChatObject.nextChats = [...parentNextChats, chat.id]
        }
        
        if(newParentChatObject.save()) {
          chat.parentChat = parentChat
        } else {
          res.status(500).json({ error: "Something's Wrong" });
        }
      }

    }
    
    const savedChat = await chat.save()
    res.status(201).json(savedChat);

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to save chat message" });
  }
}

exports.chat = chat
exports.addQuestion = addQuestion
exports.updateQuestion = updateQuestion
