// --- CONST ---
const db = require('../database/connection')
const dotenv = require('dotenv')

dotenv.config()

// --- REQUETES ---
const sqlGetTicketById = `SELECT * FROM ticket WHERE id_ticket = ?`
const sqlGetTicket = `SELECT * FROM ticket`
const sqlPostTicket = `INSERT INTO ticket (statut, date_cloture, delai, id_prestation) VALUES (?, ?, ?, ?);`

// --- FONCTION ---
exports.getTicketById = (req, res) => {
    const id_ticket = req.params.id;

    db.query(sqlGetTicketById, [id_ticket], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}

exports.getTicket = (req, res) => {
    db.query(sqlGetTicket, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}

exports.postPrestation = (req, res) => {
    const statut = req.body.statut
    const date_cloture = req.body.date_cloture
    const delai = req.body.delai
    const id_prestation = req.body.id_prestation


    db.query(sqlPostTicket, [statut, date_cloture, delai, id_prestation], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}
