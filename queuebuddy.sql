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
  `role` VARCHAR(20) NULL,
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

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;