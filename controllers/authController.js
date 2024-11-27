// --- CONST ---
const db = require('../database/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


// --- REQUETES ---
const sqlAddAccount = `INSERT INTO account (username, lastname, password, role, created_at, birthday, phone_number, email) VALUES (?,?,?,?,?,?,?,?);`


// --- FONCTION ---
exports.signin = (req, res) => {
    console.log("signin")
    const token = jwt.sign({ 'iss': 'JWT course', "email": req.body.email }, "salt", { expiresIn: '1h' })
    res.cookie('userToken', token).status(200).json({ message: 'You are connected' })
}

exports.signup = async (req, res) => {
    const temp_username = req.body.username;

    const username = temp_username.charAt(0).toUpperCase() + temp_username.slice(1).toLowerCase();
    const lastname = req.body.lastname.toUpperCase();

    const birthday = req.body.birthday
    const phone_number = req.body.phone_number
    const email = req.body.email
    const role = 1
    const created_at = new Date().toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour12: false
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            db.query(sqlAddAccount, [username, lastname, hash, role, created_at, birthday, phone_number, email], (err, results, fields) => {
                if(!err){
                    res.status(200).json({results})
                }else{
                    console.log(err)
                    res.status(500).json(err)
                }
            })
        });
    });
}