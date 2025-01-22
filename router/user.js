const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const userMiddleware = require('../middleware/userMiddleware')

// --- ROUTE ---
router.get('/:id',
    authMiddleware.verifyUserConnect,
    authMiddleware.isAdmin,
    userMiddleware.verifyIntParamsId,
    userController.getUserById
)

router.get('/',
    authMiddleware.verifyUserConnect,
    authMiddleware.isAdmin,
    userController.getUsers
)

router.post('/',
    authMiddleware.verifyUserConnect,
    userMiddleware.validateUser,
    userController.postUser
)

router.put('/',
    authMiddleware.verifyUserConnect,
    userController.putUserById
)

module.exports = router