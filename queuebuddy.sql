-- MySQL Script généré pour la création des tables
-- Ce script est adapté à la base de données `queuebuddy`

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schéma `queuebuddy`
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `queuebuddy` DEFAULT CHARACTER SET utf8 ;
USE `queuebuddy` ;

-- -----------------------------------------------------
-- Définir le fuseau horaire global
-- -----------------------------------------------------
SET GLOBAL time_zone = 'Europe/Paris';
SET time_zone = 'Europe/Paris';

SELECT @@global.time_zone, @@session.time_zone;


CREATE TABLE jour_ouverture (
   id_jour_ouverture INT AUTO_INCREMENT,
   horaire_debut TIME NOT NULL,
   horaire_fin TIME NOT NULL,
   jour_semaine ENUM('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche') NOT NULL,
   debut_pause TIME,
   fin_pause TIME,
   PRIMARY KEY(id_jour_ouverture)
);

CREATE TABLE jour_exception (
   id_jour_exception INT AUTO_INCREMENT,
   date_exception DATE NOT NULL,
   horaire_debut TIME NOT NULL,
   horaire_fin TIME NOT NULL,
   commentaire VARCHAR(255) NOT NULL,
   PRIMARY KEY(id_jour_exception)
);

CREATE TABLE etablissement (
   id_etablissement INT AUTO_INCREMENT,
   nom VARCHAR(100) NOT NULL,
   telephone VARCHAR(13) NOT NULL,
   rue VARCHAR(255) NOT NULL,
   code_postal VARCHAR(10) NOT NULL,
   ville VARCHAR(255) NOT NULL,
   numero_rue VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_etablissement)
);

CREATE TABLE prestation (
   id_prestation INT AUTO_INCREMENT,
   nom_prestation VARCHAR(50) NOT NULL,
   temps_approximatif TIME NOT NULL,
   id_etablissement INT,
   PRIMARY KEY(id_prestation),
   FOREIGN KEY(id_etablissement) REFERENCES etablissement(id_etablissement)
);

CREATE TABLE personnel (
   id_personnel INT AUTO_INCREMENT,
   mail VARCHAR(254) NOT NULL,
   password VARCHAR(100) NOT NULL,
   nom VARCHAR(50) NOT NULL,
   prenom VARCHAR(50) NOT NULL,
   numero_telephone VARCHAR(13) NOT NULL,
   date_naissance DATE NOT NULL,
   date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   role ENUM('administrateur', 'medecin', 'secretaire') NOT NULL,
   id_etablissement INT NOT NULL,
   id_prestation INT,
   PRIMARY KEY(id_personnel),
   FOREIGN KEY(id_etablissement) REFERENCES etablissement(id_etablissement),
   FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation)
);

CREATE TABLE ticket (
   id_ticket INT AUTO_INCREMENT,
   date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   statut VARCHAR(50) NOT NULL DEFAULT 'enCours',
   date_cloture DATETIME NOT NULL,
   delai TIME NOT NULL DEFAULT '00:00:00',
   id_prestation INT NOT NULL,
   PRIMARY KEY(id_ticket),
   FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation)
);

CREATE TABLE utilisateur (
   id_utilisateur INT AUTO_INCREMENT,
   nom VARCHAR(50) NOT NULL,
   numero_telephone VARCHAR(13) NOT NULL,
   prenom VARCHAR(50) NOT NULL,
   date_naissance DATE NOT NULL,
   methode_creation VARCHAR(9) NOT NULL,
   id_ticket INT NOT NULL,
   PRIMARY KEY(id_utilisateur),
   UNIQUE(id_ticket),
   FOREIGN KEY(id_ticket) REFERENCES ticket(id_ticket)
);

CREATE TABLE retour (
   id_retour INT AUTO_INCREMENT,
   commentaire VARCHAR(500) NOT NULL,
   date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   id_ticket INT NOT NULL,
   PRIMARY KEY(id_retour),
   UNIQUE(id_ticket),
   FOREIGN KEY(id_ticket) REFERENCES ticket(id_ticket)
);

CREATE TABLE ouverture (
   id_jour_ouverture INT,
   id_etablissement INT,
   PRIMARY KEY(id_jour_ouverture, id_etablissement),
   FOREIGN KEY(id_jour_ouverture) REFERENCES jour_ouverture(id_jour_ouverture),
   FOREIGN KEY(id_etablissement) REFERENCES etablissement(id_etablissement)
);

CREATE TABLE fermeture (
   id_jour_ouverture INT,
   id_jour_exception INT,
   PRIMARY KEY(id_jour_ouverture, id_jour_exception),
   FOREIGN KEY(id_jour_ouverture) REFERENCES jour_ouverture(id_jour_ouverture),
   FOREIGN KEY(id_jour_exception) REFERENCES jour_exception(id_jour_exception)
);

CREATE TABLE disponibilite (
   id_prestation INT,
   id_jour_ouverture INT,
   PRIMARY KEY(id_prestation, id_jour_ouverture),
   FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation),
   FOREIGN KEY(id_jour_ouverture) REFERENCES jour_ouverture(id_jour_ouverture)
);


-- -----------------------------------------------------
-- Création de l'utilisateur user_api (avec des privilèges restreints sur `queuebuddy`)
-- -----------------------------------------------------
CREATE USER IF NOT EXISTS '${DB_USER_API}'@'%' IDENTIFIED BY '${DB_PASSWORD_API}';
GRANT SELECT, INSERT, UPDATE, DELETE ON queuebuddy.* TO '${DB_USER_API}'@'%';
FLUSH PRIVILEGES;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO jour_ouverture (horaire_debut, horaire_fin, jour_semaine, debut_pause, fin_pause)
VALUES 
('08:00:00', '12:00:00', 'Lundi', '12:00:00', '13:00:00'),
('09:00:00', '18:00:00', 'Mardi', '12:30:00', '13:30:00'),
('08:30:00', '17:30:00', 'Mercredi', '12:00:00', '12:30:00');

INSERT INTO jour_exception (date_exception, horaire_debut, horaire_fin, commentaire)
VALUES 
('2024-12-25', '09:00:00', '12:00:00', 'Fermeture exceptionnelle pour Noël'),
('2024-07-14', '10:00:00', '16:00:00', 'Fermeture exceptionnelle pour le jour de la Bastille'),
('2025-01-01', '08:00:00', '12:00:00', 'Fermeture exceptionnelle pour le Nouvel An');

INSERT INTO etablissement (nom, telephone, rue, code_postal, ville, numero_rue)
VALUES 
('Etablissement A', '0102030405', '123 Rue Principale', '75001', 'Paris', '1'),
('Etablissement B', '0607080910', '456 Avenue de la République', '69001', 'Lyon', '2'),
('Etablissement C', '0112233445', '789 Boulevard de la Liberté', '13001', 'Marseille', '3');

INSERT INTO prestation (nom_prestation, temps_approximatif, id_etablissement)
VALUES 
('Consultation médicale', '00:30:00', 1),
('Examen de laboratoire', '01:00:00', 2),
('Rééducation physique', '00:45:00', 3);

INSERT INTO personnel (mail, password, nom, prenom, numero_telephone, date_naissance, date_creation, role, id_etablissement, id_prestation)
VALUES 
('admin@queuebuddy.com', '$2b$10$9BbPZvA/sDv9rZlpHY/ZFuTmSiuUdF17JOwGv5q6XJKv0qeg2753.', 'Doe', 'John', '0123456789', '1980-01-01', NOW(), 'administrateur', 1, 1),
('doctor@queuebuddy.com', '$2b$10$LFQUTmlYYtoQf2EkBzZa/.ntkAsNBUp8pBJXAoVgsp8h89vpuN1ra', 'Smith', 'Jane', '0234567890', '1975-05-15', NOW(), 'medecin', 2, 2),
('secretary@queuebuddy.com', '$2b$10$/3l.0OEbNOFR9LmJsa1/XuhnO.RnqOtqm7sAmev8mq1YQnmt88hJu', 'Brown', 'Alice', '0345678901', '1990-11-20', NOW(), 'secretaire', 3, 3);

INSERT INTO ticket (date_creation, statut, date_cloture, delai, id_prestation)
VALUES 
(NOW(), 'enCours', '2024-12-25 12:00:00', '01:00:00', 1),
(NOW(), 'enAttente', '2024-12-20 10:00:00', '00:45:00', 2),
(NOW(), 'termine', '2024-12-22 16:30:00', '00:30:00', 3);

INSERT INTO utilisateur (nom, numero_telephone, prenom, date_naissance, methode_creation, id_ticket)
VALUES 
('Dupont', '0101010101', 'Pierre', '1995-03-12', 'téléphone', 1),
('Martin', '0202020202', 'Sophie', '1985-07-24', 'qrCode', 2),
('Lemoine', '0303030303', 'Lucie', '2000-11-01', 'borne', 3);

INSERT INTO retour (commentaire, date_creation, id_ticket)
VALUES 
('Service rapide et efficace', NOW(), 1),
('Médecin très professionnel', NOW(), 2),
('Accueil sympathique, mais délais longs', NOW(), 3);

INSERT INTO ouverture (id_jour_ouverture, id_etablissement)
VALUES 
(1, 1),
(2, 2),
(3, 3);

INSERT INTO fermeture (id_jour_ouverture, id_jour_exception)
VALUES 
(1, 1),
(2, 2),
(3, 3);

INSERT INTO disponibilite (id_prestation, id_jour_ouverture)
VALUES 
(1, 1),
(2, 2),
(3, 3);