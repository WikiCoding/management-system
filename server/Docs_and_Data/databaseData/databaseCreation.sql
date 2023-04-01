CREATE DATABASE "tasks";

CREATE TABLE `tasks`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `position` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `manager_email` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

CREATE TABLE `tasks`.`tasks` (
  `idtasks` INT NOT NULL AUTO_INCREMENT,
  `task` VARCHAR(2500) NOT NULL,
  `completed` TINYINT NOT NULL DEFAULT 0,
  `userId` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtasks`),
  INDEX `fk_userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `tasks-test`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

