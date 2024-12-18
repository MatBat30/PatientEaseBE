const db = require('../database/connection')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')

dotenv.config()

// --- REQUETES ---
const sqlGetAccountById = `SELECT id_utilisateur, numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket FROM utilisateur WHERE id_utilisateur = ?;`
const sqlGetAccounts    = `SELECT id_utilisateur, numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket FROM utilisateur;`
const sqlPostAccount    = `INSERT INTO utilisateur (numero_telephone, nom, prenom, date_naissance, methode_creation, id_ticket) VALUES (?, ?, ?, ?, ?, ?);`
const sqlUpdateAccount  = `UPDATE utilisateur SET numero_telephone = ?, nom = ?, prenom = ?, date_naissance = ?, methode_creation = ?, id_ticket = ? WHERE id_utilisateur = ?;`


// --- FONCTION ---
exports.getUserById = (req, res) => {

}

exports.getUsers = (req, res) => {
    db.query(sqlGetAccounts, (err, results) => {
        if (err) {
            res.status(500).json({"message": "Internal Server Error"});
        }
        res.status(200).json(results);
    });
}

exports.postUser = (req, res) => {

}

exports.putUserById = (req, res) => {

}