const db = require('../database/connection')
const dotenv = require('dotenv')
const enumTicket = require('../enum')

dotenv.config()

const { body, validationResult } = require('express-validator');

exports.validateTicket = [
    body('statut')
        .isIn(['enAttente', 'enCours', 'termine', 'enPause', 'annule']).withMessage('Le statut doit être l\'un des suivants : enAttente, enCours, termine, enPause, annule'),

    body('date_cloture')
        .isISO8601().withMessage('La date de clôture doit être une date valide (format: YYYY-MM-DD HH:MM)')
        .isBefore(new Date().toISOString()).withMessage('La date de clôture ne peut pas être dans le futur'),

    body('delai')
        .matches(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/).withMessage('Le délai doit être au format HH:MM:SS'),

    body('id_prestation')
        .isInt().withMessage('L\'ID de prestation doit être un entier')
        .toInt(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
