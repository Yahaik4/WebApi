const express = require('express')
const router = express.Router()

const siteController = require('../controllers/siteController')
const auth = require('../util/index')

// router.post('/register', siteController.createAccout)
router.get('/register', siteController.registerPage)
// router.post('/login', siteController.handleLogin)
router.get('/login', siteController.loginPage)
router.get('/',auth,  siteController.home)

module.exports = router