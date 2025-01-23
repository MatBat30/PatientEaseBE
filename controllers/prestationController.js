const db = require('../database/connection')
const dotenv = require('dotenv')

dotenv.config()

const AppDataSource = require("../data-source");
const { Prestation } = require("../entities/Prestation");

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
    const id_etablissement = req.body.id_etablissement

    createPrestation(nom_prestation, temps_approximatif, id_etablissement, res)
}

// --- FUNCTIONS TypeORM --- 
async function createPrestation(nom_prestation, temps_approximatif, id_etablissement, res) {
    try {
        const prestationRepository = AppDataSource.getRepository("Prestation");
    
        const newPrestation = prestationRepository.create({
          nom_prestation: nom_prestation,
          temps_approximatif: temps_approximatif,
          id_etablissement: id_etablissement,
        });
    
        await prestationRepository.save(newPrestation);
        res.status(201).json(newPrestation);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  
