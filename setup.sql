-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: task_manager
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id_comment` int unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `id_task` int unsigned NOT NULL,
  `id_user` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `IX_comment_id_user` (`id_user`),
  KEY `IX_comment_id_task` (`id_task`),
  CONSTRAINT `FK_comment_id_task` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_comment_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id_project` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `color` char(6) DEFAULT NULL,
  PRIMARY KEY (`id_project`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;



--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id_tag` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `color` char(6) DEFAULT NULL,
  PRIMARY KEY (`id_tag`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;




--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id_task` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `id_parent_task` int unsigned DEFAULT NULL,
  `id_project` int unsigned DEFAULT NULL,
  `id_author` int unsigned NOT NULL,
  `status` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_task`),
  KEY `IX_task_id_parent_task` (`id_parent_task`),
  KEY `IX_task_id_project` (`id_project`),
  KEY `IX_task_id_author` (`id_author`),
  KEY `IX_task_status` (`status`),
  KEY `IX_task_status_date` (`status`,`date` DESC),
  KEY `IX_task_status_id_project` (`status`,`id_project`),
  CONSTRAINT `FK_task_id_author` FOREIGN KEY (`id_author`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_task_id_project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_task_id_task` FOREIGN KEY (`id_parent_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1028 DEFAULT CHARSET=utf8;



--
-- Table structure for table `task_in_tag`
--

DROP TABLE IF EXISTS `task_in_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_in_tag` (
  `id_task_in_tag` int unsigned NOT NULL AUTO_INCREMENT,
  `id_task` int unsigned DEFAULT NULL,
  `id_tag` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_task_in_tag`),
  KEY `IX_task_in_tag_id_task` (`id_task`),
  KEY `IX_task_in_tag_id_tag` (`id_tag`),
  KEY `IX_task_in_tag_id_tag_id_task` (`id_tag`,`id_task`),
  CONSTRAINT `FK_task_in_tag_id_tag` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_task_in_tag_id_task` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;



--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `password` binary(60) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `IU_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;




--
-- Table structure for table `user_in_project`
--

DROP TABLE IF EXISTS `user_in_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_in_project` (
  `id_user_in_project` int unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned NOT NULL,
  `id_project` int unsigned NOT NULL,
  PRIMARY KEY (`id_user_in_project`),
  KEY `IX_user_in_project_id_user` (`id_user`),
  KEY `IX_user_in_project_id_project` (`id_project`),
  CONSTRAINT `FK_user_in_project_id_project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_in_project_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;



--
-- Table structure for table `user_in_tag`
--

DROP TABLE IF EXISTS `user_in_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_in_tag` (
  `id_user_in_tag` int unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned NOT NULL,
  `id_tag` int unsigned NOT NULL,
  PRIMARY KEY (`id_user_in_tag`),
  KEY `IX_user_in_tag_id_user` (`id_user`),
  KEY `IX_user_in_tag_id_tag` (`id_tag`),
  CONSTRAINT `FK_user_in_tag_id_tag` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_in_tag_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;



--
-- Table structure for table `user_in_task`
--

DROP TABLE IF EXISTS `user_in_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_in_task` (
  `id_user_in_task` int unsigned NOT NULL,
  `id_user` int unsigned NOT NULL,
  `id_task` int unsigned NOT NULL,
  PRIMARY KEY (`id_user_in_task`),
  KEY `IX_user_in_task_id_user` (`id_user`),
  KEY `IX_user_in_task_id_task` (`id_task`),
  CONSTRAINT `FK_user_in_task_id_task` FOREIGN KEY (`id_task`) REFERENCES `task` (`id_task`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_in_task_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-27 16:16:05
