const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


// --- route react ---
router.get('/:id',
    authMiddleware.verifyUserConnect,
    userController.getInfosUser
)

router.get('/',
    authMiddleware.verifyUserConnect,
    userController.getCurrentInfosUser
)

router.put('/:id',
    authMiddleware.verifyUserConnect,
    userController.updateAnInfosUser
)

router.put('/',
    authMiddleware.verifyUserConnect,
    userController.updateCurrentInfosUser
)

module.exports = router