-- MySQL Script generated by MySQL Workbench
-- Sun Nov 10 16:02:11 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema patientEase
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema patientEase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `patientEase` DEFAULT CHARACTER SET utf8 ;
USE `patientEase` ;

-- -----------------------------------------------------
-- Table `patientEase`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `patientEase`.`account` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `role` INT NULL,
  `created_at` VARCHAR(45) NULL,
  `birthday` VARCHAR(45) NULL,
  `phone_number` VARCHAR(20) NULL,
  `email` VARCHAR(255) NULL,
  PRIMARY KEY (`account_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Créer un utilisateur avec un accès global
CREATE USER 'externe'@'%' IDENTIFIED BY 'externepswd';

-- Accorder tous les privilèges sur toutes les bases de données
GRANT ALL PRIVILEGES ON . TO 'externe'@'%' WITH GRANT OPTION;