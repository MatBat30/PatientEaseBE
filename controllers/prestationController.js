const db = require('../database/connection')
const dotenv = require('dotenv')

dotenv.config()

// --- REQUETES ---
const sqlGetPrestationById = `SELECT * FROM prestation WHERE id_prestation = ?`
const sqlGetPrestation = `SELECT * FROM prestation`
const sqlPostPrestation = `INSERT INTO prestation (nom_prestation, temps_approximatif, id_personnel) VALUES (?, ?, ?);`

exports.getPrestationById = (req, res) => {
    const id_prestation = req.params.id;
    console.log(id_prestation)

    db.query(sqlGetPrestationById, [id_prestation], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}

exports.getPrestation = (req, res) => {
    db.query(sqlGetPrestation, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}

exports.postPrestation = (req, res) => {
    const nom_prestation = req.body.nom_prestation;
    const temps_approximatif = req.body.temps_approximatif

    db.query(sqlPostPrestation, [nom_prestation, temps_approximatif, req.id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Internal Server Error" });
        }
        res.status(200).json(results);
    });
}
