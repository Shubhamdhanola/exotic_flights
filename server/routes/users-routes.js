const express = require('express')
const usersController = require('../controllers/users-controller')
const authToken = require('../middlewares/auth')

const router = express.Router()

router.post('/signup', usersController.signup)

router.post('/login', usersController.login)

router.get('/logout', authToken, usersController.logout)

router.get('/', usersController.getUsers)

router.get('/delete/:userId', usersController.deleteUser)

router.get('/:userId', usersController.getUserbyId)

module.exports = router;