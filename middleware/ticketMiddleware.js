const db = require('../database/connection')
const dotenv = require('dotenv')
const enumTicket = require('../enum')

dotenv.config()

const { body, validationResult } = require('express-validator');

exports.validateTicket = [
    body('statut')
        .optional()
        .isIn(Object.values(enumTicket.EnumTicket)).withMessage('Invalid status'),

    body('date_cloture')
        .optional()
        .isISO8601().withMessage('The closure date must be in ISO8601 format')
        .custom((value) => {
            const dateCloture = new Date(value);
            const now = new Date();

            if (dateCloture <= now) {
                throw new Error('The closure date must be strictly later than the current time');
            }
            return true;
        }),

    body('delai')
        .optional()
        .matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/).withMessage('The delay must be in HH:MM:SS format'),

    body('id_prestation')
        .notEmpty().withMessage('The prestation ID is required')
        .isInt({ min: 1 }).withMessage('The prestation ID must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
