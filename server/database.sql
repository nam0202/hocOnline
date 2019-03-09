-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: classOnline
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment` (
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Post_id` int(11) NOT NULL,
  `Content` text,
  PRIMARY KEY (`id`),
  KEY `fk_Comment_user1_idx` (`user_id`),
  KEY `fk_Comment_Post1_idx` (`Post_id`),
  CONSTRAINT `fk_Comment_Post1` FOREIGN KEY (`Post_id`) REFERENCES `Post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comment_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Content` longtext,
  `user_id` int(11) NOT NULL,
  `type_post_id` int(11) NOT NULL,
  `Created` datetime DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Post_user1_idx` (`user_id`),
  KEY `fk_Post_type_post1_idx` (`type_post_id`),
  KEY `fk_Post_class1_idx` (`class_id`),
  CONSTRAINT `fk_Post_class1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Post_type_post1` FOREIGN KEY (`type_post_id`) REFERENCES `type_post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Post_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,'Demo',4,1,'2019-10-10 00:00:00',1),(2,'Bài Post slide CEH',4,1,'2019-12-29 00:00:00',2),(3,'Bài Post slide CEH',4,2,'2019-12-29 00:00:00',3),(4,'Bài Post slide Java',5,1,'2019-12-29 00:00:00',3),(5,'Bài Post slide CEH',5,2,'2019-12-29 00:00:00',4),(6,'Bài Post slide CEH',4,1,'2019-12-29 00:00:00',2),(7,'Bài Post slide CEH',4,2,'2019-12-29 00:00:00',3),(8,'Bài Post slide CEH',5,1,'2019-12-29 00:00:00',4),(9,'Bài Post slide CEH',4,2,'2019-12-29 00:00:00',5),(10,'Bài Post slide CEH',5,1,'2019-12-29 00:00:00',6),(11,'Bài Post slide CEH',5,2,'2019-12-29 00:00:00',3),(12,'Bài Post slide CEH',5,1,'2019-12-29 00:00:00',2),(13,'Bài Post slide CEH',5,2,'2019-12-29 00:00:00',3),(14,'Demo',4,1,'2019-10-10 00:00:00',1),(15,'Bài Post slide CEH',4,1,'2019-12-29 00:00:00',2),(16,'Bài Post slide CEH',4,2,'2019-12-29 00:00:00',3),(17,'Bài Post slide Java',5,1,'2019-12-29 00:00:00',3),(18,'Bài Post slide CEH',5,2,'2019-12-29 00:00:00',4),(19,'Bài Post slide CEH',4,1,'2019-12-29 00:00:00',2),(20,'Bài Post slide CEH',4,2,'2019-12-29 00:00:00',3),(21,'Bài Post slide CEH',5,1,'2019-12-29 00:00:00',4),(22,'Bài Post slide CEH',4,2,'2019-12-29 00:00:00',5),(23,'Bài Post slide CEH',5,1,'2019-12-29 00:00:00',6),(24,'Bài Post slide CEH',5,2,'2019-12-29 00:00:00',3),(25,'Bài Post slide CEH',5,1,'2019-12-29 00:00:00',2),(26,'Bài Post slide CEH',5,2,'2019-12-29 00:00:00',3);
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_has_roles`
--

DROP TABLE IF EXISTS `Post_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_has_roles` (
  `Post_id` int(11) NOT NULL,
  `roles_id` int(11) NOT NULL,
  PRIMARY KEY (`Post_id`,`roles_id`),
  KEY `fk_Post_has_roles_roles1_idx` (`roles_id`),
  KEY `fk_Post_has_roles_Post1_idx` (`Post_id`),
  CONSTRAINT `fk_Post_has_roles_Post1` FOREIGN KEY (`Post_id`) REFERENCES `Post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Post_has_roles_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_has_roles`
--

LOCK TABLES `Post_has_roles` WRITE;
/*!40000 ALTER TABLE `Post_has_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `Type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Class_Type1_idx` (`Type_id`),
  CONSTRAINT `fk_Class_Type1` FOREIGN KEY (`Type_id`) REFERENCES `type_class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'L01',1),(2,'L01',2),(3,'L01',3),(4,'L02',1),(5,'L02',2),(6,'L02',3);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_has_user`
--

DROP TABLE IF EXISTS `class_has_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_has_user` (
  `Class_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  PRIMARY KEY (`Class_id`,`User_id`),
  KEY `fk_Class_has_User_User1_idx` (`User_id`),
  KEY `fk_Class_has_User_Class1_idx` (`Class_id`),
  CONSTRAINT `fk_Class_has_User_Class1` FOREIGN KEY (`Class_id`) REFERENCES `class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Class_has_User_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_has_user`
--

LOCK TABLES `class_has_user` WRITE;
/*!40000 ALTER TABLE `class_has_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_has_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data`
--

DROP TABLE IF EXISTS `data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `Post_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_data_Post1_idx` (`Post_id`),
  CONSTRAINT `fk_data_Post1` FOREIGN KEY (`Post_id`) REFERENCES `Post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data`
--

LOCK TABLES `data` WRITE;
/*!40000 ALTER TABLE `data` DISABLE KEYS */;
/*!40000 ALTER TABLE `data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `User_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_login_User1_idx` (`User_id`),
  CONSTRAINT `fk_login_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (2,'admin','$2a$10$ERnPzYh2IAFEDkmFFPug2OAaWU5T/KoW6tFDOecWVtowS.hO6bnO2',4),(3,'user','$2a$10$XzUtvrk.NbfP501R8HWgRuBQB7ctdCAT6j76/wF/9LcjEszbRSfky',5);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_class`
--

DROP TABLE IF EXISTS `type_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_class`
--

LOCK TABLES `type_class` WRITE;
/*!40000 ALTER TABLE `type_class` DISABLE KEYS */;
INSERT INTO `type_class` VALUES (1,'CEH'),(2,'CCNA'),(3,'JAVA-WEB');
/*!40000 ALTER TABLE `type_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_post`
--

DROP TABLE IF EXISTS `type_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_post`
--

LOCK TABLES `type_post` WRITE;
/*!40000 ALTER TABLE `type_post` DISABLE KEYS */;
INSERT INTO `type_post` VALUES (1,'Lesson'),(2,'Lab');
/*!40000 ALTER TABLE `type_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'admin',NULL,NULL),(5,'user',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_roles`
--

DROP TABLE IF EXISTS `user_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_has_roles` (
  `User_id` int(11) NOT NULL,
  `Roles_id` int(11) NOT NULL,
  PRIMARY KEY (`User_id`,`Roles_id`),
  KEY `fk_User_has_Roles_Roles1_idx` (`Roles_id`),
  KEY `fk_User_has_Roles_User1_idx` (`User_id`),
  CONSTRAINT `fk_User_has_Roles_Roles1` FOREIGN KEY (`Roles_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Roles_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_roles`
--

LOCK TABLES `user_has_roles` WRITE;
/*!40000 ALTER TABLE `user_has_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-08  8:40:07

-- -----------------------------------------------------
-- Table `hocOnline`.`notifycation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `notifycation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NULL,
  `days` DATE NULL,
  `class_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_notifycation_class1_idx` (`class_id` ASC),
  CONSTRAINT `fk_notifycation_class1`
    FOREIGN KEY (`class_id`)
    REFERENCES `class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `hocOnline`.`infor_notify`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infor_notify` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `time` TIME NULL,
  `content` TEXT NULL,
  `isAlarm` INT NULL DEFAULT 1,
  `notifycation_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_infor_notify_notifycation1_idx` (`notifycation_id` ASC),
  CONSTRAINT `fk_infor_notify_notifycation1`
    FOREIGN KEY (`notifycation_id`)
    REFERENCES `notifycation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;
