// --- CONST ---
const db = require('../database/connection')
const dotenv = require('dotenv')

dotenv.config()

const AppDataSource = require("../data-source");
const { Ticket } = require("../entities/Ticket");

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

exports.postTicket = (req, res) => {
    const statut = req.body.statut
    const date_cloture = req.body.date_cloture
    const delai = req.body.delai
    const id_prestation = req.body.id_prestation

    createTicket(statut, date_cloture, delai, id_prestation, res)
}

// --- FUNCTIONS TypeORM --- 
async function createTicket(statut, date_cloture, delai, id_prestation, res) {
    try {
        const ticketRepository = AppDataSource.getRepository("Ticket");

        const newTicket = ticketRepository.create({
            statut: statut,
            date_cloture: date_cloture,
            delai: delai,
            id_prestation: id_prestation,
        });

        await ticketRepository.save(newTicket);
        res.status(201).json(newTicket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}