const db = require('../database/connection')
const dotenv = require('dotenv')
const enumUser = require('../enum')

dotenv.config()

const { body, validationResult } = require('express-validator');

// --- REQUETES ---
const sqlGetAccountById = `SELECT * FROM utilisateur WHERE id_utilisateur = ?;`

exports.verifyIntParamsId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "L'ID est requis dans l'URL" });
        }

        const idInt = parseInt(id, 10);
        if (isNaN(idInt) || idInt.toString() !== id) {
            return res.status(400).json({ message: "L'ID doit être un entier valide" });
        }

        if (idInt <= 0) {
            return res.status(400).json({ message: "L'ID doit être un entier positif" });
        }

        req.params.id = idInt;
        next();
    } catch (error) {
        console.error("Erreur lors de la vérification de l'ID :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

exports.validateUser = [
  body('numero_telephone')
    .isLength({ min: 10, max: 10 }).withMessage('Le numéro de téléphone doit comporter 10 chiffres')
    .isNumeric().withMessage('Le numéro de téléphone doit être composé uniquement de chiffres'),

  body('nom')
    .isAlpha().withMessage('Le nom doit contenir uniquement des lettres')
    .isLength({ min: 2 }).withMessage('Le nom doit comporter au moins 2 caractères'),

  body('prenom')
    .isAlpha().withMessage('Le prénom doit contenir uniquement des lettres')
    .isLength({ min: 2 }).withMessage('Le prénom doit comporter au moins 2 caractères'),

  body('date_naissance')
    .isISO8601().withMessage('La date de naissance doit être une date valide (format: YYYY-MM-DD)')
    .isBefore(new Date().toISOString()).withMessage('La date de naissance ne peut pas être dans le futur'),

  body('methode_creation')
    .isIn(['qrCode', 'borne', 'téléphone']).withMessage('La méthode de création doit être l\'un des suivants : qrCode, borne, téléphone'),

  body('id_ticket')
    .isInt().withMessage('L\'ID du ticket doit être un entier')
    .toInt(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]

exports.verifyUserExist = (req, res, next) => {
  const idUtilisateur = req.body.id_utilisateur;
    
    if (!Number.isInteger(Number(idUtilisateur))) {
        return res.status(400).json({ message: "L'ID utilisateur doit être un nombre entier" });
    }

  db.query('SELECT * FROM utilisateur WHERE id_utilisateur = ?', [idUtilisateur], (err, result) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur serveur"});
    }

    if (result.length === 0) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    next();
});
}