const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "mariadb", // Utilisez mariadb comme type de base de données
  host: process.env.DB_HOST, // Récupéré de votre fichier .env
  port: 3306,
  username: process.env.DB_USER_API, // Votre utilisateur MariaDB
  password: process.env.DB_PASSWORD_API, // Votre mot de passe MariaDB
  database: process.env.DB_NAME, // Nom de votre base de données
  synchronize: true, // Synchronise les entités avec la base (à ne pas utiliser en production)
  logging: true, // Active les logs (utile pour le dev)
  entities: [__dirname + "/entities/*.js"], // Chemin des entités
  migrations: [__dirname + "/migrations/*.js"], // Chemin des migrations (si vous en avez besoin)
});

module.exports = AppDataSource;
