const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// --- ROUTE ---
router.get('/:id',
    authMiddleware.verifyUserConnect,
    authMiddleware.isAdmin,
    userController.getUserById
)

router.get('/',
    authMiddleware.verifyUserConnect,
    authMiddleware.isAdmin,
    userController.getUsers
)

router.post('/',
    authMiddleware.verifyUserConnect,
    userController.postUser
)

router.put('/',
    authMiddleware.verifyUserConnect,
    userController.putUserById
)

module.exports = router