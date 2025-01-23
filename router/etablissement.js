const express = require('express')
const router = express.Router()
const etablissementMiddleware = require('../middleware/etablissementMiddleware')
const etablissementController = require('../controllers/etablissementController')

// --- ROUTE ---
router.get('/:id',
    etablissementController.getEtablissementById
)

router.get('/',
    etablissementController.getEtablissements
)

router.post('/',
    etablissementMiddleware.validateEtablissement,
    etablissementController.postEtablissement
)

router.put('/',
    etablissementMiddleware.validateEtablissement,
    etablissementController.putEtablissementById
)
module.exports = router