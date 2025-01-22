// --- CONST ---
const db = require('../database/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const commonEnum = require('../enum')

// --- REQUETES ---
const sqlAddAccount = `INSERT INTO staff (mail, password, nom, prenom, numero_telephone, date_naissance) VALUES (?,?,?,?,?,?);`

// --- FONCTION ---
exports.signin = (req, res) => {
    console.log("id ", req.id)
    console.log("role", req.role)
    const token = jwt.sign({ 'iss': 'JWT course', "id": req.id, "role": req.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
    res.cookie('userToken', token).status(200).json({ message: 'You are connected' })
}

exports.signup = async (req, res) => {
    console.log(req.body)
    let temp_username = req.body.prenom;

    let nom = req.body.nom
    nom = nom.toUpperCase()
    let prenom = temp_username.charAt(0).toUpperCase() + temp_username.slice(1).toLowerCase();
    let numero_telephone = req.body.numero_telephone
    let date_naissance = req.body.date_naissance
    const mail = req.body.mail
    const role = commonEnum.EnumStaffRole.MEDECIN
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            console.log(salt)
            db.query(sqlAddAccount, [mail, hash, nom, prenom, numero_telephone, date_naissance, role], (err, results, fields) => {
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

exports.signout = (req, res) => {
    res.clearCookie('userToken');
    res.cookie('userToken', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: 'strict'
    }).status(200).json({ message: 'You are disconnected' });
}