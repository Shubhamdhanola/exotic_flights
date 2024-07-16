const express = require('express')
const adminController = require('../controllers/admins-controller')
const adminAuthToken = require('../middlewares/admin-auth')

const router = express.Router()

router.post('/signup', adminController.signup)

router.post('/login', adminController.login)

router.get('/logout', adminAuthToken, adminController.logout)

router.get('/', adminController.getadmins)

module.exports = router;