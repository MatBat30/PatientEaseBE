const db = require('../database/connection')
const dotenv = require('dotenv')
dotenv.config()
const { body, validationResult } = require('express-validator');

exports.validatePrestation = [
    body('nom_prestation')
        .notEmpty().withMessage('The name of the prestation is required')
        .isLength({ max: 50 }).withMessage('The name of the prestation must not exceed 50 characters'),

    body('temps_approximatif')
        .optional() // The field can be NULL or empty, so we make it optional
        .isString().withMessage('The estimated time must be in the format HH:MM:SS') // Checks if the format is a string
        .matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/).withMessage('The estimated time format is incorrect (expected HH:MM:SS)'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
