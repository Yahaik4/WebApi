const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/siteController')
const auth = require('../middleware/handle_login')

router.post('/register', siteController.createAccout)
// router.get('/register', siteController.registerPage)
router.post('/login', siteController.handleLogin)
// router.get('/login', siteController.loginPage)
// router.get('/home', siteController.home)

module.exports = router