const express = require('express')
const chatbotController = require('../controllers/chatbot-controller')

const router = express.Router()

router.post('/chat', chatbotController.chat)

router.get('/chats', chatbotController.getAllListing)

router.post('/chat/add', chatbotController.addChat)

router.get('/chat/listing', chatbotController.getAllChats)

router.get('/chat/listing/first', chatbotController.getFirstAllChats)

router.get('/chat/:id', chatbotController.getSingleChat)

router.post('/chat/update/:id', chatbotController.updateChat)

router.post('/chat/delete/:id', chatbotController.deleteChat)

module.exports = router;