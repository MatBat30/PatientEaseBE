// --- CONST ---
const db = require('../database/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const commonEnum = require('../enum')

const AppDataSource = require("../data-source");
const { Personnel } = require("../entities/Personnel");

// --- REQUETES ---
const sqlAddAccount = `INSERT INTO personnel (mail, password, nom, prenom, numero_telephone, date_naissance, role, id_etablissement) VALUES (?,?,?,?,?,?,?,?);`

// --- ROUTER ---
exports.signin = (req, res) => {
    const token = jwt.sign({ 'iss': 'JWT course', "id": req.id, "role": req.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
    res.cookie('userToken', token).status(200).json({ message: 'You are connected' })
}

exports.signup = async (req, res) => {
    let temp_username = req.body.prenom;

    let nom = req.body.nom
    nom = nom.toUpperCase()
    let prenom = temp_username.charAt(0).toUpperCase() + temp_username.slice(1).toLowerCase();
    let numero_telephone = req.body.numero_telephone
    let date_naissance = req.body.date_naissance
    const mail = req.body.mail
    const id_etablissement = req.body.id_etablissement

    let role = req.body.role
    if ((role != commonEnum.EnumPersonnelRole.ADMINISTRATEUR) && 
        (role != commonEnum.EnumPersonnelRole.MEDECIN) && 
        (role != commonEnum.EnumPersonnelRole.SECRETAIRE))
    {
        // WARNING : Peut-être pas mettre directelement le rôle MEDECIN
        role = commonEnum.EnumPersonnelRole.MEDECIN
    }
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) {
                res.status(500).json({ error: "Internal Server Error" });
            } else {

            }

            createPersonnel(mail, hash, nom, prenom, numero_telephone, date_naissance, role, id_etablissement, res)
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

// --- FUNCTIONS TypeORM ---  
async function createPersonnel(mail, password, nom, prenom, numero_telephone, date_naissance, role, id_etablissement, res) {
    try {
        const personnelRepository = AppDataSource.getRepository("Personnel");
    
        const newPersonnel = personnelRepository.create({
          mail: mail,
          password: password,
          nom: nom,
          prenom: prenom,
          numero_telephone: numero_telephone,
          date_naissance: date_naissance,
          id_etablissement, id_etablissement,
          role: role,
        });
    
        await personnelRepository.save(newPersonnel);
        res.status(201).json(newPersonnel);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  