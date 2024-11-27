const db = require('../database/connection')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

exports.validateSignup = [
    body('email')
        .isEmail().withMessage('Email invalide')
        .custom(async (value) => {
            const [rows] = await db.promise().query('SELECT * FROM staff WHERE mail = ?', [value]);
            if (rows.length > 0) {
                throw new Error('L\'email est déjà utilisé');
            }
            return true;
        }),

    body('password')
        .isLength({ min: 8 }).withMessage('Mot de passe trop court')
        .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre'),

    body('username')
        .notEmpty().withMessage('Nom d\'utilisateur requis'),

    body('birthday')
        .notEmpty().withMessage('La date de naissance est requise')
        .isDate().withMessage('La date de naissance n\'est pas valide')
        .custom((value) => {
            const birthDate = new Date(value);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            const month = new Date().getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && new Date().getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                throw new Error('Vous devez avoir au moins 18 ans pour vous inscrire');
            }
            return true;
        }),

    body('phone_number')
        .notEmpty().withMessage('Le numéro de téléphone est requis')
        .matches(/^0[1-9]{1}[0-9]{8}$/).withMessage('Le numéro de téléphone n\'est pas valide'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.verifyCredentialsExist = (req, res, next) => {
    
    let count = 0
    if (Array.isArray(req.body)) {
        count = req.body.length - 1
    }
    for (let index = 0; index <= count; index++) {
        const email = req.body.email ?? req.body[index].email
        const password = req.body.password ?? req.body[index].password
        if (email != undefined && password != undefined && email != "" && password != "") {
            if (index == count) {
                next()
            }
        } else {
            res.status(400).json({ message: 'Email and password are required' })
            break
        }
    }
}

exports.verifyUserExist = (req, res, next) => {
    const email = req.body.email ?? req.body[0].email
    db.query('SELECT * FROM staff WHERE mail = ?', [email],
        (err, result) => {
            if (!err) {
                if (result != "") {
                    next()
                } else {
                    res.status(401).json({ message: "Email / Mot de passe incorrect." })
                }
            } else {
                console.log(err)
            }
        }
    );
}

exports.verifyPassword = (req, res, next) => {
    const email = req.body.email ?? req.body[0].email
    const password = req.body.password ?? req.body[0].password
    db.query('SELECT * FROM staff WHERE mail = ?', [email],
        (err, result) => {
            bcrypt.compare(password, result[0].password, (err, result_bcrypt) => {
                if (result_bcrypt) {
                    next()
                } else {
                    res.status(401).json({ message: "Invalid credentials" })
                }
            });
        });
}