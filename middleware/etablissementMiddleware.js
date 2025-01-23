const db = require('../database/connection')
const dotenv = require('dotenv')
dotenv.config()
const { body, validationResult } = require("express-validator");

// Middleware de validation
exports.validateEtablissement = [
  body("nom")
    .notEmpty().withMessage("Le champ 'nom' est obligatoire.")
    .isString().withMessage("Le champ 'nom' doit être une chaîne de caractères.")
    .isLength({ max: 100 }).withMessage("Le champ 'nom' ne peut pas dépasser 100 caractères."),
  
  body("telephone")
    .notEmpty().withMessage("Le champ 'telephone' est obligatoire.")
    .isLength({ min: 10, max: 10 }).withMessage("Le champ 'telephone' doit contenir exactement 10 chiffres.")
    .isNumeric().withMessage("Le champ 'telephone' doit être un numéro."),
  
  body("rue")
    .notEmpty().withMessage("Le champ 'rue' est obligatoire.")
    .isString().withMessage("Le champ 'rue' doit être une chaîne de caractères.")
    .isLength({ max: 100 }).withMessage("Le champ 'rue' ne peut pas dépasser 100 caractères."),
  
  body("code_postal")
    .notEmpty().withMessage("Le champ 'code_postal' est obligatoire.")
    .isNumeric().withMessage("Le champ 'code_postal' doit être un numéro.")
    .isLength({ min: 5, max: 5 }).withMessage("Le champ 'code_postal' doit contenir exactement 5 chiffres."),
  
  body("ville")
    .notEmpty().withMessage("Le champ 'ville' est obligatoire.")
    .isString().withMessage("Le champ 'ville' doit être une chaîne de caractères.")
    .isLength({ max: 100 }).withMessage("Le champ 'ville' ne peut pas dépasser 100 caractères."),
  
  body("numero_rue")
    .notEmpty().withMessage("Le champ 'numero_rue' est obligatoire.")
    .isNumeric().withMessage("Le champ 'numero_rue' doit être un numéro.")
    .isInt({ min: 1 }).withMessage("Le champ 'numero_rue' doit être un entier positif."),
];
