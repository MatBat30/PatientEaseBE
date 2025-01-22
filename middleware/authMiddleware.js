const db = require('../database/connection')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const bcrypt = require('bcrypt');
const commonEnum = require('../enum')

const { body, validationResult } = require('express-validator');

exports.validateSignup = [
    body('mail')
        .isEmail().withMessage('Invalid email')
        .custom(async (value) => {
            const [rows] = await db.promise().query('SELECT * FROM staff WHERE mail = ?', [value]);
            if (rows.length > 0) {
                throw new Error('Email is already in use');
            }
            return true;
        }),
    body('password')
        .isLength({ min: 8 }).withMessage('Password is too short')
        .matches(/\d/).withMessage('Password must contain at least one number'),

    body('nom')
        .notEmpty().withMessage('Lastname is required'),

    body('prenom')
        .notEmpty().withMessage('Firstname is required'),

    body('date_naissance')
        .notEmpty().withMessage('Birthday is required')
        .isDate().withMessage('Birthday is not valid')
        .custom((value) => {
            const birthDate = new Date(value);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            const month = new Date().getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && new Date().getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                throw new Error('You must be at least 18 years old to sign up');
            }
            return true;
        }),

    body('numero_telephone')
        .notEmpty().withMessage('Phone number is required')
        .matches(/^0[1-9]{1}[0-9]{8}$/).withMessage('Phone number is not valid'),

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
                const id = result[0].id_staff
                const role = result[0].role
                if (result != "") {
                    req.id = id
                    req.role = role
                    next()
                } else {
                    res.status(401).json({ message: "Email / Mot de passe invalid" })
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

exports.verifyUserConnect = (req, res, next) => {
    try {
        const token = req.headers.cookie.split("userToken=")[1].split(";")[0]
        const id = jwt.verify(token, process.env.JWT_SECRET_KEY).id
        const role = jwt.verify(token, process.env.JWT_SECRET_KEY).role
        req.id = id
        req.role = role
        const newToken = jwt.sign({ 'iss': 'JWT course', "id": id, "role": role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.cookie('userToken', newToken)

        next()
    } catch (error) {
        res.status(401).json("Not connected")
    }
}

exports.isAdmin = (req, res, next) => {
    let role = null
    if (req.role) {
        role = req.role
    }else{
        const token = req.headers.cookie.split("userToken=")[1].split(";")[0]
        role = jwt.verify(token, process.env.JWT_SECRET_KEY).role
    }

    if (role == commonEnum.EnumStaffRole.ADMINISTRATEUR) {
        next()
    } else {
        res.status(400).json("Admin role is required")
    }
}

exports.isMedecin = (req, res, next) => {
    let role = null
    if (req.role) {
        role = req.role
    }else{
        const token = req.headers.cookie.split("userToken=")[1].split(";")[0]
        role = jwt.verify(token, process.env.JWT_SECRET_KEY).role
    }

    if (role == commonEnum.EnumStaffRole.MEDECIN) {
        next()
    } else {
        res.status(400).json("Medecin role is required")
    }
}

exports.isSecretaire = (req, res, next) => {
    let role = null
    if (req.role) {
        role = req.role
    }else{
        const token = req.headers.cookie.split("userToken=")[1].split(";")[0]
        role = jwt.verify(token, process.env.JWT_SECRET_KEY).role
    }

    if (role == commonEnum.EnumStaffRole.SECRETAIRE) {
        next()
    } else {
        res.status(400).json("Secretaire role is required")
    }
}