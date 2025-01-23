const db = require('../database/connection')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')

dotenv.config()

const AppDataSource = require("../data-source");
const { Utilisateur } = require("../entities/Utilisateur");

// --- REQUETES ---
const sqlGetAccountById = `SELECT id_utilisateur, numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket FROM utilisateur WHERE id_utilisateur = ?;`
const sqlGetAccounts = `SELECT id_utilisateur, numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket FROM utilisateur;`
const sqlPostAccount = `INSERT INTO utilisateur (numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket) VALUES (?, ?, ?, ?, ?, ?);`
const sqlUpdateAccount = `UPDATE utilisateur SET numero_telephone = ?, nom = ?, prenom = ?, date_naissance = ?, methode_creation = ?, id_ticket = ? WHERE id_utilisateur = ?;`

// --- FONCTION ---
exports.getUserById = (req, res) => {
    db.query(sqlGetAccountById, [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}

exports.getUsers = (req, res) => {
    db.query(sqlGetAccounts, (err, results) => {
        if (err) {
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}

exports.postUser = (req, res) => {
    const numero_telephone = req.body.numero_telephone;
    const nom = req.body.nom
    const prenom = req.body.prenom
    const date_naissance = req.body.date_naissance
    const methode_creation = req.body.methode_creation
    const id_ticket = req.body.id_ticket

    db.query(sqlPostAccount, [numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}

exports.putUserById = (req, res) => {
    const id_utilisateur = req.body.id_utilisateur
    const numero_telephone = req.body.numero_telephone;
    const nom = req.body.nom
    const prenom = req.body.prenom
    const date_naissance = req.body.date_naissance
    const methode_creation = req.body.methode_creation
    const id_ticket = req.body.id_ticket

    createUtilisateur(numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket, id_utilisateur, res)

    // db.query(sqlUpdateAccount, [numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket, id_utilisateur], (err, results) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).json({ "message": "Internal Server Error" });
    //     }
    //     res.status(200).json(results);
    // });
}

// --- FUNCTIONS TypeORM ---  
async function createUtilisateur(numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket, res) {
    try {
        const utilisateurRepository = AppDataSource.getRepository("Utilisateur");
    
        const newUtilisateur = utilisateurRepository.create({
            numero_telephone: numero_telephone,
          password: password,
          nom: nom,
          prenom: prenom,
          date_naissance: date_naissance,
          methode_creation: methode_creation,
          id_ticket, id_ticket,
        });
    
        await utilisateurRepository.save(newUtilisateur);
        res.status(201).json(newUtilisateur);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  