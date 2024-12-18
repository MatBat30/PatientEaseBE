const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// WARNING Implémenter le check access control

// --- ROUTE ---
router.get('/:id',
    userController.getUserById
)

router.get('/',
    userController.getUsers
)

router.post('/',
    userController.postUser
)

router.put('/',
    userController.putUserById
)

module.exports = router