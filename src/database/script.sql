


-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema rollerdreams
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rollerdreams
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rollerdreams` DEFAULT CHARACTER SET utf8mb4 ;
USE `rollerdreams` ;
GRANT ALL PRIVILEGES ON rollerdreams.* TO 'root'@'localhost' IDENTIFIED BY '';

-- -----------------------------------------------------
-- Table `rollerdreams`.`contactos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rollerdreams`.`contactos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `mensaje` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `rollerdreams`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rollerdreams`.`usuario` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `name` VARCHAR(60) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
