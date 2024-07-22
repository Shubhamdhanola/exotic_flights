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

const addChat = async (req, res) => {
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

const updateChat = async (req, res) => {
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

const getAllChats = async (req, res) => {
  let chats;

  try {
    chats = await Chat.aggregate([
      {
        $project: {
          id: 1,
          text: 1
        }
      },
      {
        $sort: {
            date : -1
        }
      }
    ])
    res.status(200).json(chats)
  } catch (err) {
    res.status(400).json({ error: "Failed to find chats" });
  }
}

const getAllListing = async (req, res) => {
  let chats;

  try {
    chats = await Chat.aggregate([
      {
        $sort: {
            date : -1
        }
      }
    ])
    res.status(200).json(chats)
  } catch (err) {
    res.status(400).json({ error: "Failed to find chats" });
  }
}

const getFirstAllChats = async (req, res) => {
  let chats;

  try {
    chats = await Chat.aggregate([
      {
        $project: {
          id: 1,
          text: 1,
          nextChats: 1,
          parentChat: 1
        }
      },
      {
        $sort: {
            date : -1
        }
      },
      {
        $match: {
          parentChat: null
        }
      }
    ])
    res.status(200).json(chats)
  } catch (err) {
    res.status(400).json({ error: "Failed to find chats" });
  }
}

const getSingleChat = async (req, res) => {
  const chatId = req.params.id
  console.log(chatId)
  let chat;

  try {
    chat = await Chat.findById(chatId)
    res.status(200).json(chat)
  } catch (err) {
    res.status(400).json({ error: "Failed to find chats" });
  }
}

const getNextChats = async (req, res) => {
  const chatId = req.params.id
  console.log(chatId)
  let chats;

  try {
    chats = await Chat.aggregate([
      {
        $project: {
          id: 1,
          text: 1,
          nextChats: 1,
          parentChat: 1
        }
      },
      {
        $sort: {
            date : -1
        }
      },
      {
        $match: {
          parentChat: chatId
        }
      }
    ])
    res.status(200).json(chats)
  } catch (err) {
    res.status(400).json({ error: "Failed to find chats" });
  }
}

const deleteChat = async (req, res) => {
  const chatId = req.params.id
  let chat;

  try {
    chat = await Chat.findById(chatId)
    if(chat != null) {
      let deletedChat = await Chat.findByIdAndDelete(chatId)
      if(deletedChat) {
        res.status(200).json({ status: true })
      } else {
        res.status(400).json({ error: "Something's Wrong" })
      }
    } else {
      res.status(400).json({ error: "Chat Not Found" })
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to find chats" });
  }
}

exports.chat = chat
exports.addChat = addChat
exports.updateChat = updateChat
exports.getAllChats = getAllChats
exports.getFirstAllChats = getFirstAllChats
exports.getSingleChat = getSingleChat
exports.getAllListing = getAllListing
exports.deleteChat = deleteChat
exports.getNextChats = getNextChats
