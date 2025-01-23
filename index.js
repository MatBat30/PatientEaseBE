// --- CONST ---
require("reflect-metadata");
const express = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT
const AppDataSource = require("./data-source");

// const { Utilisateur } = require("./entities/Utilisateur"); // Remplace par ton chemin d'entité
// const { faker } = require('@faker-js/faker');

// --- SWAGGER ---
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger/conbineSwagger');

// --- ROUTER ---
const auth = require('./router/auth')
const user = require('./router/user')
const prestation = require('./router/prestation')
const ticket = require('./router/ticket')

// --- ---
const app = express()
app.use(express.json())

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));

// --- CONNECT TO BDD ---
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    // --- PATH ---
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get('/', (req, res) => { res.json({ message: 'Hello world !'})})
    app.use('/auth', auth)
    app.use('/user', user)
    app.use('/prestation', prestation)
    app.use('/ticket', ticket)

    // // --- FAKER JS ---
    // // WARNING, à supprimer en prod
    
    // // --- UTILISATEUR ---
    // seedDataUtilisateur().catch((error) => {
    //   console.error('Erreur lors de l\'insertion des données : ', error);
    // });


    // --- START SERVER ---
    app.listen(port, () => {
        console.log('App listen on port : ' + port)
        console.log(`Documentation Swagger : http://localhost:${port}/api-docs`);
    })
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    console.error("Error launching server");
  });


  // // --- FUNCTION FAKER ---
  // async function seedDataUtilisateur() {
  //   // Commencer une transaction
  //   const userRepository = AppDataSource.getRepository(Utilisateur);
    
  //   // Créer 10 utilisateurs aléatoires
  //   const users = [];
  //   for (let i = 0; i < 10; i++) {
  //     const user = new Utilisateur();
  //     user.nom = faker.name.lastName();
  //     user.prenom = faker.name.firstName();
  //     user.numero_telephone = faker.phone.phoneNumber();
  //     user.date_naissance = faker.date.past(25, new Date()).toISOString().split('T')[0]; // Date de naissance il y a 25 ans max
  //     user.methode_creation = "manual"; // Exemple
  //     user.id_ticket = faker.datatype.number({ min: 1, max: 100 }); // Assumes you have an ID for the ticket
  
  //     users.push(user);
  //   }
  
  //   // Insérer les utilisateurs dans la base de données
  //   await userRepository.save(users);
  
  //   console.log('Données insérées avec succès');
  // }