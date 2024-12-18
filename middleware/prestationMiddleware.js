const db = require('../database/connection')
const dotenv = require('dotenv')
dotenv.config()
const { body, validationResult } = require('express-validator');

const validatePrestation = [
    body('nom_prestation')
        .notEmpty().withMessage('Le nom de la prestation est requis')
        .isLength({ max: 50 }).withMessage('Le nom de la prestation ne doit pas dépasser 50 caractères'),

    body('temps_approximatif')
        .optional() // Le champ peut être NULL ou vide, donc on le rend optionnel
        .isString().withMessage('Le temps approximatif doit être sous le format HH:MM:SS') // Vérifie que le format est bien une chaîne
        .matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/).withMessage('Le format du temps approximatif est incorrect (attendu HH:MM:SS)'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validatePrestation;