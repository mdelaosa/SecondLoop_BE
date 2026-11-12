-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema second_loop_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema second_loop_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `second_loop_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `second_loop_db` ;

-- -----------------------------------------------------
-- Table `second_loop_db`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('USUARIO', 'MODERADOR', 'ADMINISTRADOR') NOT NULL DEFAULT 'USUARIO',
  `url_foto` VARCHAR(255) NULL,
  `esta_activo` TINYINT NOT NULL DEFAULT 1,
  `creado_en` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`articulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`articulos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `precio` DECIMAL(6,2) NOT NULL,
  `talla` ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'UNICA') NOT NULL,
  `genero` ENUM('H', 'M', 'UNISEX') NOT NULL,
  `marca` VARCHAR(45) NULL,
  `localizacion` VARCHAR(100) NOT NULL,
  `codigo_postal` VARCHAR(10) NULL,
  `estado_conservacion` ENUM('NUEVO', 'COMO_NUEVO', 'BUEN_ESTADO', 'ACEPTABLE') NOT NULL,
  `estado` ENUM('BORRADOR', 'PUBLICADO', 'EN_REVISION', 'RETIRADO', 'VENDIDO') NOT NULL DEFAULT 'BORRADOR',
  `publicado_en` DATETIME NOT NULL DEFAULT NOW(),
  `vendido_en` DATETIME NULL,
  `categoria_id` INT NOT NULL,
  `vendedor_id` INT NOT NULL,
  `comprador_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_articulos_categorias1_idx` (`categoria_id` ASC) VISIBLE,
  INDEX `fk_articulos_usuarios1_idx` (`vendedor_id` ASC) VISIBLE,
  INDEX `fk_articulos_usuarios2_idx` (`comprador_id` ASC) INVISIBLE,
  FULLTEXT INDEX `ft_articulos` (`titulo`, `descripcion`) VISIBLE,
  CONSTRAINT `fk_articulos_categorias1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `second_loop_db`.`categorias` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_articulos_usuarios1`
    FOREIGN KEY (`vendedor_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_articulos_usuarios2`
    FOREIGN KEY (`comprador_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`fotos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`fotos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `articulo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_fotos_articulos1_idx` (`articulo_id` ASC) VISIBLE,
  CONSTRAINT `fk_fotos_articulos1`
    FOREIGN KEY (`articulo_id`)
    REFERENCES `second_loop_db`.`articulos` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`notificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`notificaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `mensaje` VARCHAR(255) NOT NULL,
  `creado_en` DATETIME NOT NULL DEFAULT NOW(),
  `leido_en` DATETIME NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_notificaciones_usuarios1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_notificaciones_usuarios1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`reportes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`reportes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `motivo` VARCHAR(255) NOT NULL,
  `detalle` VARCHAR(255) NULL,
  `estado` ENUM('PENDIENTE', 'EN_REVISION', 'REVISADO') NOT NULL DEFAULT 'PENDIENTE',
  `creado_en` DATETIME NOT NULL DEFAULT NOW(),
  `usuario_reportado_id` INT NULL,
  `emisor_id` INT NOT NULL,
  `articulo_id` INT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  INDEX `fk_reportes_usuarios1_idx` (`usuario_reportado_id` ASC) VISIBLE,
  INDEX `fk_reportes_usuarios2_idx` (`emisor_id` ASC) VISIBLE,
  INDEX `fk_reportes_articulos1_idx` (`articulo_id` ASC) INVISIBLE,
  CONSTRAINT `fk_reportes_usuarios1`
    FOREIGN KEY (`usuario_reportado_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reportes_usuarios2`
    FOREIGN KEY (`emisor_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reportes_articulos1`
    FOREIGN KEY (`articulo_id`)
    REFERENCES `second_loop_db`.`articulos` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`valoraciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`valoraciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comentario` VARCHAR(255) NULL,
  `puntuacion` DECIMAL(3,2) NOT NULL,
  `creado_en` DATETIME NOT NULL DEFAULT NOW(),
  `receptor_id` INT NOT NULL,
  `emisor_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_valoraciones_usuarios1_idx` (`receptor_id` ASC) VISIBLE,
  INDEX `fk_valoraciones_usuarios2_idx` (`emisor_id` ASC) VISIBLE,
  CONSTRAINT `fk_valoraciones_usuarios1`
    FOREIGN KEY (`receptor_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_valoraciones_usuarios2`
    FOREIGN KEY (`emisor_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`moderaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`moderaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `accion` VARCHAR(100) NOT NULL,
  `detalle` VARCHAR(255) NULL,
  `creado_en` DATETIME NOT NULL DEFAULT NOW(),
  `reporte_id` INT NOT NULL,
  `moderador_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_historial_reportes1_idx` (`reporte_id` ASC) VISIBLE,
  INDEX `fk_historial_usuarios1_idx` (`moderador_id` ASC) VISIBLE,
  CONSTRAINT `fk_historial_reportes1`
    FOREIGN KEY (`reporte_id`)
    REFERENCES `second_loop_db`.`reportes` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_historial_usuarios1`
    FOREIGN KEY (`moderador_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`conversaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`conversaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creado_en` DATETIME NOT NULL DEFAULT NOW(),
  `articulo_id` INT NOT NULL,
  `comprador_id` INT NOT NULL,
  `vendedor_id` INT NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  INDEX `fk_conversaciones_articulos1_idx` (`articulo_id` ASC) VISIBLE,
  INDEX `fk_conversaciones_usuarios1_idx` (`comprador_id` ASC) VISIBLE,
  INDEX `fk_conversaciones_usuarios2_idx` (`vendedor_id` ASC) VISIBLE,
  UNIQUE INDEX `conversaciones_idx` (`articulo_id` ASC, `comprador_id` ASC) VISIBLE,
  CONSTRAINT `fk_conversaciones_articulos1`
    FOREIGN KEY (`articulo_id`)
    REFERENCES `second_loop_db`.`articulos` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_conversaciones_usuarios1`
    FOREIGN KEY (`comprador_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_conversaciones_usuarios2`
    FOREIGN KEY (`vendedor_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`mensajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`mensajes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mensaje` VARCHAR(255) NOT NULL,
  `enviado_en` DATETIME NOT NULL DEFAULT NOW(),
  `leido_en` DATETIME NULL,
  `conversacion_id` INT NOT NULL,
  `emisor_id` INT NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  INDEX `fk_mensajes_conversaciones1_idx` (`conversacion_id` ASC) VISIBLE,
  INDEX `fk_mensajes_usuarios1_idx` (`emisor_id` ASC) VISIBLE,
  CONSTRAINT `fk_mensajes_conversaciones1`
    FOREIGN KEY (`conversacion_id`)
    REFERENCES `second_loop_db`.`conversaciones` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_mensajes_usuarios1`
    FOREIGN KEY (`emisor_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `second_loop_db`.`favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `second_loop_db`.`favoritos` (
  `usuario_id` INT NOT NULL,
  `articulo_id` INT NOT NULL,
  INDEX `fk_Favoritos_usuarios1_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_Favoritos_articulos1_idx` (`articulo_id` ASC) VISIBLE,
  PRIMARY KEY (`usuario_id`, `articulo_id`),
  CONSTRAINT `fk_Favoritos_usuarios1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `second_loop_db`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Favoritos_articulos1`
    FOREIGN KEY (`articulo_id`)
    REFERENCES `second_loop_db`.`articulos` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
