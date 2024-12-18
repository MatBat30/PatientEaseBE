const express = require('express')
const router = express.Router()
const prestationController = require('../controllers/prestationController')
const authMiddleware = require('../middleware/authMiddleware')
const prestationMiddleware = require('../middleware/prestationMiddleware')

// --- ROUTE ---
router.get('/:id',
    authMiddleware.verifyUserConnect,
    authMiddleware.isAdmin,
    prestationController.getPrestationById
)

router.get('/',
    authMiddleware.verifyUserConnect,
    authMiddleware.isAdmin,
    prestationController.getPrestation
)

router.post('/',
    authMiddleware.verifyUserConnect,
    authMiddleware.isAdmin,
    prestationController.postPrestation
)

module.exports = router

