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


-- -----------------------------------------------------
-- Table `staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `staff` (
  `id_staff` INT NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(254) NULL,
  `password` VARCHAR(100) NULL,
  `nom` VARCHAR(50) NULL,
  `prenom` VARCHAR(50) NULL,
  `numero_telephone` VARCHAR(13) NULL,
  `date_naissance` DATE NULL,
  `date_creation` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `role` ENUM('administrateur', 'medecin', 'secretaire') NULL,
  PRIMARY KEY (`id_staff`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `prestation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestation` (
  `id_prestation` INT NOT NULL AUTO_INCREMENT,
  `nom_prestation` VARCHAR(50) NULL,
  `temps_approximatif` TIME NULL,
  `id_staff` INT NOT NULL,
  PRIMARY KEY (`id_prestation`),
  FOREIGN KEY (`id_staff`) REFERENCES `staff`(`id_staff`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticket` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `date_creation` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `statut` ENUM('termine', 'enPause', 'annule', 'enAttente', 'enCours') DEFAULT 'enCours',
  `date_cloture` DATETIME NULL,
  `delai` TIME DEFAULT '00:00',
  `id_prestation` INT NOT NULL,
  PRIMARY KEY (`id_ticket`),
  FOREIGN KEY (`id_prestation`) REFERENCES `prestation`(`id_prestation`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `utilisateur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` INT NOT NULL AUTO_INCREMENT,
  `numero_telephone` VARCHAR(13) NULL,
  `nom` VARCHAR(50) NULL,
  `prenom` VARCHAR(50) NULL,
  `date_naissance` DATE NULL,
  `methode_creation` ENUM('qrCode', 'borne', 'téléphone') NULL,
  `id_ticket` INT NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE (`id_ticket`),
  FOREIGN KEY (`id_ticket`) REFERENCES `ticket`(`id_ticket`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `feedback` (
  `id_feedback` INT NOT NULL AUTO_INCREMENT,
  `commentaire` VARCHAR(500) NULL,
  `date_creation` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `id_ticket` INT NOT NULL,
  PRIMARY KEY (`id_feedback`),
  UNIQUE (`id_ticket`),
  FOREIGN KEY (`id_ticket`) REFERENCES `ticket`(`id_ticket`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Création de l'utilisateur user_api (avec des privilèges restreints sur `queuebuddy`)
-- -----------------------------------------------------
CREATE USER IF NOT EXISTS '${DB_USER_API}'@'%' IDENTIFIED BY '${DB_PASSWORD_API}';
GRANT SELECT, INSERT, UPDATE, DELETE ON queuebuddy.* TO '${DB_USER_API}'@'%';
FLUSH PRIVILEGES;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -- Insertion de données dans la table `staff`
-- INSERT INTO `staff` (`mail`, `password`, `nom`, `prenom`, `numero_telephone`, `date_naissance`, `role`)
-- VALUES
-- ('admin@queuebuddy.com', 'admin123', 'Admin', 'Principal', '0102030405', '1980-01-01', 'administrateur'),
-- ('dr.smith@queuebuddy.com', 'pass1234', 'Smith', 'John', '0607080910', '1975-05-20', 'medecin'),
-- ('secretary@queuebuddy.com', 'secpass', 'Doe', 'Jane', '0506070809', '1990-11-15', 'secretaire');

-- -- Insertion de données dans la table `prestation`
-- INSERT INTO `prestation` (`nom_prestation`, `temps_approximatif`, `id_staff`)
-- VALUES
-- ('Consultation Générale', '00:30:00', 2),
-- ('Examen Radiologique', '01:00:00', 2),
-- ('Suivi Administratif', '00:15:00', 3);

-- -- Insertion de données dans la table `ticket`
-- INSERT INTO `ticket` (`statut`, `delai`, `id_prestation`)
-- VALUES
-- ('enAttente', '00:10:00', 1),
-- ('enCours', '00:05:00', 2),
-- ('termine', '00:00:00', 3);

-- -- Insertion de données dans la table `utilisateur`
-- INSERT INTO `utilisateur` (`numero_telephone`, `nom`, `prenom`, `date_naissance`, `methode_creation`, `id_ticket`)
-- VALUES
-- ('0612345678', 'Dupont', 'Alice', '1995-03-10', 'borne', 1),
-- ('0623456789', 'Martin', 'Bob', '1988-07-22', 'téléphone', 2),
-- ('0634567890', 'Durand', 'Charlie', '2000-12-05', 'qrCode', 3);

-- -- Insertion de données dans la table `feedback`
-- INSERT INTO `feedback` (`commentaire`, `id_ticket`)
-- VALUES
-- ('Service rapide et efficace.', 1),
-- ('Un peu d’attente, mais globalement satisfait.', 2),
-- ('Excellent accueil et suivi.', 3);