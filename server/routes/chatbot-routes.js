const express = require('express')
const chatbotController = require('../controllers/chatbot-controller')

const router = express.Router()

router.post('/chat', chatbotController.chat)
module.exports = router;