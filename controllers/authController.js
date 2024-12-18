// --- CONST ---
const db = require('../database/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const commonEnum = require('../enum')

// --- REQUETES ---
const sqlAddAccount = `INSERT INTO staff (mail, password, nom, prenom, numero_telephone, date_naissance, date_creation, role) VALUES (?,?,?,?,?,?,?,?);`

// --- FONCTION ---
exports.signin = (req, res) => {
    console.log("id ", req.id)
    console.log("role", req.role)
    const token = jwt.sign({ 'iss': 'JWT course', "id": req.id, "role": req.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
    res.cookie('userToken', token).status(200).json({ message: 'You are connected' })
}

exports.signup = async (req, res) => {
    const temp_username = req.body.username;

    const username = temp_username.charAt(0).toUpperCase() + temp_username.slice(1).toLowerCase();
    const lastname = req.body.lastname.toUpperCase();

    const birthday = req.body.birthday
    const phone_number = req.body.phone_number
    const email = req.body.email

    // const role = 1 // 1 => administrateur; 2 => medecin; 3 => secretaire
    const role = commonEnum.StaffRole.ADMINISTRATEUR
    
    const created_at = new Date().toLocaleDateString('fr-FR', {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/').reverse().join('-');

    console.log("created_at", created_at)
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            db.query(sqlAddAccount, [email, hash, lastname, username, phone_number, birthday, created_at, role], (err, results, fields) => {
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