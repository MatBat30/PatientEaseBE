const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

// --- ROUTE ---
router.post('/signin',
    authMiddleware.verifyCredentialsExist,
    authMiddleware.verifyUserExist,
    authMiddleware.verifyPassword,
    authController.signin)

router.post('/signup',
    authMiddleware.validateSignup,
    authController.signup)

module.exports = router