const express = require('express')
const chatbotController = require('../controllers/chatbot-controller')

const router = express.Router()

router.post('/chat', chatbotController.chat)

router.post('/chat/add', chatbotController.addQuestion)

router.post('/chat/update/:id', chatbotController.updateQuestion)

module.exports = router;