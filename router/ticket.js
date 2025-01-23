const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')
const authMiddleware = require('../middleware/authMiddleware')
const ticketMiddleware = require('../middleware/ticketMiddleware')

// --- ROUTE ---
router.get('/:id',
    authMiddleware.verifyUserConnect,
    ticketController.getTicketById
)

router.get('/',
    authMiddleware.verifyUserConnect,
    ticketController.getTicket
)

router.post('/',
    authMiddleware.verifyUserConnect,
    // ticketMiddleware.validateTicket,
    ticketController.postTicket
)

module.exports = router