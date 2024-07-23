const express = require('express')
const usersChatController = require('../controllers/usersChat-controller')

const router = express.Router()

router.post('/save', usersChatController.chat)
router.get('/get/:userId', usersChatController.getChat)

module.exports = router;