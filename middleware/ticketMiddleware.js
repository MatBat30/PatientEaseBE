const db = require('../database/connection')
const dotenv = require('dotenv')
const enumTicket = require('../enum')

dotenv.config()

const { body, validationResult } = require('express-validator');

exports.validateTicket = [
    body('statut')
        .optional()
        .isIn(Object.values(enumTicket.EnumTicket)).withMessage('Statut invalide'),

    body('date_cloture')
        .optional()
        .isISO8601().withMessage('La date de clôture doit être au format ISO8601')
        .custom((value) => {
            const dateCloture = new Date(value);
            const now = new Date();

            if (dateCloture <= now) {
                throw new Error('La date de clôture doit être strictement postérieure à l\'heure actuelle');
            }
            return true;
        }),

    body('delai')
        .optional()
        .matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/).withMessage('Le délai doit être au format HH:MM:SS'),

    body('id_prestation')
        .notEmpty().withMessage('L\'ID de la prestation est requis')
        .isInt({ min: 1 }).withMessage('L\'ID de la prestation doit être un entier positif'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

