-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: mysql-3ca6856f-vizsgaremek111112143453465.g.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '2c7de643-04eb-11f1-a68d-d2b8df77228a:1-474,
82b00032-00e8-11f1-bc1e-5aebf5164a13:1-27,
e00ec131-01c8-11f1-88c2-12f7312c42be:1-42';

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cname` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  PRIMARY KEY (`cname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Billentyűs hangszerek'),('Elektronikus hangszerek'),('Fúvós hangszerek'),('Húros hangszerek'),('Ütős hangszerek');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foryou`
--

DROP TABLE IF EXISTS `foryou`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foryou` (
  `fid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `cname` varchar(100) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`fid`),
  KEY `foryou_uid_IDX` (`uid`) USING BTREE,
  KEY `foryou_cname_IDX` (`cname`) USING BTREE,
  CONSTRAINT `foryou_category_FK` FOREIGN KEY (`cname`) REFERENCES `category` (`cname`),
  CONSTRAINT `foryou_user_FK` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foryou`
--

LOCK TABLES `foryou` WRITE;
/*!40000 ALTER TABLE `foryou` DISABLE KEYS */;
INSERT INTO `foryou` VALUES (13,9,'Húros hangszerek'),(17,17,'Billentyűs hangszerek');
/*!40000 ALTER TABLE `foryou` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrument`
--

DROP TABLE IF EXISTS `instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrument` (
  `iid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `iname` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `cost` int NOT NULL,
  `scname` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `sold` tinyint(1) NOT NULL,
  `IsPremium` tinyint DEFAULT NULL,
  `Condition` varchar(100) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `imageCount` int DEFAULT NULL,
  PRIMARY KEY (`iid`),
  KEY `fk_instrument_subcategory` (`scname`),
  KEY `fk_instrument_user` (`uid`),
  CONSTRAINT `fk_instrument_subcategory` FOREIGN KEY (`scname`) REFERENCES `subcategory` (`scname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_instrument_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `instrument_ibfk_2` FOREIGN KEY (`scname`) REFERENCES `subcategory` (`scname`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrument`
--

LOCK TABLES `instrument` WRITE;
/*!40000 ALTER TABLE `instrument` DISABLE KEYS */;
INSERT INTO `instrument` VALUES (52,9,'Bromo BAA1 SET 2 Natural',80000,'Akusztikus gitár','Bontatlan csomagolásban lévő kiváló állapotú gitár 1-szer sem volt még használva!',0,0,'Újszerű',2),(54,23,'Fender Stratocaster',235000,'Basszusgitár','A játékosokat a formatív zenei kalandok kísérésére tervezték, a Fender Standard Stratocaster elérhető játszhatóságot és inspiráló hangzást kínál, amelyek a Fendert rock & roll ikonná tették.',0,0,'Kiváló',2),(55,23,'Gibson Les Paul',945000,'Basszusgitár','',0,0,'Jó',2),(57,24,'Stradivarius hegedű',4950000,'Hegedű','',0,0,'Kiváló',2),(58,24,'Fender Precision Bass',250000,'Basszusgitár','A játékosokat a formatív zenei kalandok kísérésére tervezték, a Fender Standard Precision Bass azt a hozzáférhető játszhatóságot és inspiráló hangszínt kínálja',0,0,'Jó',2),(59,30,'Yamaha C40 Klasszikus Gitár',35000,'Akusztikus gitár','Yamaha C40 klasszikus gitár, ideális kezdők és haladók számára. Meleg, kiegyensúlyozott hangzás, kényelmes nyak és minőségi kidolgozás. Nylon húrokkal szerelt, klasszikus és akusztikus zenéhez kiváló.',0,0,'Kiváló',2),(60,30,'Pearl Export Dobfelszerelés',280000,'Dobkészlet','Teljes Pearl Export dobkészlet pergővel, lábdobbal, tamokkal és cintányérokkal. Erőteljes hangzás, masszív hardverek. Ideális próbaterembe és koncertre egyaránt.',0,1,'Jó',2),(61,25,'Yamaha P-45 Digitális Zongora',160000,'Digitális Zongora','Yamaha P-45 digitális zongora súlyozott billentyűzettel és kiváló hangmintával. Kompakt méretű, könnyen szállítható. Gyakorláshoz, stúdióhoz és otthoni használatra ideális.',0,1,'Kiváló',2),(62,25,'Ibanez SR300 Basszusgitár',110000,'Basszusgitár','Ibanez SR300 aktív elektronikával felszerelt basszusgitár. Könnyű test, gyors nyak és erőteljes hangzás. Rock, funk és metal stílusokhoz is kiváló választás.',0,1,'Jó',2),(63,13,'Yamaha YTR-2330 Trombit',90000,'Trombita','Yamaha YTR-2330 trombita tiszta és erőteljes hangzással. Kezdők és haladók számára egyaránt megfelelő. A hangszer rendszeresen karbantartott, jó állapotú szelepekkel.',0,1,'Újszerű',2),(64,13,'Selmer AS42 Altszaxofon',220000,'Szaxofon','Selmer AS42 altszaxofon gazdag, meleg hangzással. Kiváló választás jazz, klasszikus és könnyűzenei stílusokhoz. A hangszer rendszeresen karbantartott, a billentyűk és a párnák jó állapotban vannak. Tokkal és fúvókával együtt eladó, azonnal használható állapotban.',0,0,'Átlagos',2),(72,17,'Zongora',2000000,'Digitális Zongora','fasza',0,1,'Újszerű',1),(77,9,'test test',11111,'Csembaló','asiuasgőaogasfas',0,1,'Újszerű',1);
/*!40000 ALTER TABLE `instrument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderinfo`
--

DROP TABLE IF EXISTS `orderinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderinfo` (
  `oid` int NOT NULL AUTO_INCREMENT,
  `dateOfPurchase` date NOT NULL,
  `iid` int NOT NULL,
  `dateOfShipArrive` datetime DEFAULT NULL,
  `dateOfShipStart` datetime DEFAULT NULL,
  `status` varchar(100) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `cid` int DEFAULT NULL,
  PRIMARY KEY (`oid`),
  UNIQUE KEY `iid` (`iid`),
  KEY `orderinfo_cid_IDX` (`cid`) USING BTREE,
  CONSTRAINT `orderinfo_ibfk_1` FOREIGN KEY (`iid`) REFERENCES `instrument` (`iid`),
  CONSTRAINT `orderinfo_user_FK` FOREIGN KEY (`cid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderinfo`
--

LOCK TABLES `orderinfo` WRITE;
/*!40000 ALTER TABLE `orderinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `scname` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `cname` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  PRIMARY KEY (`scname`),
  KEY `fk_subcategory_category` (`cname`),
  CONSTRAINT `fk_subcategory_category` FOREIGN KEY (`cname`) REFERENCES `category` (`cname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES ('Csembaló','Billentyűs hangszerek'),('Digitális Zongora','Billentyűs hangszerek'),('MIDI billentyűzet','Billentyűs hangszerek'),('Orgona','Billentyűs hangszerek'),('Zongora','Billentyűs hangszerek'),('Drum machine','Elektronikus hangszerek'),('Groovebox','Elektronikus hangszerek'),('Loop station','Elektronikus hangszerek'),('Sampler','Elektronikus hangszerek'),('Szintetizátor','Elektronikus hangszerek'),('Theremin','Elektronikus hangszerek'),('Duda','Fúvós hangszerek'),('Fagott','Fúvós hangszerek'),('Furulya','Fúvós hangszerek'),('Fuvola','Fúvós hangszerek'),('Harsona','Fúvós hangszerek'),('Klarinét','Fúvós hangszerek'),('Kürt','Fúvós hangszerek'),('Oboa','Fúvós hangszerek'),('Pánsíp','Fúvós hangszerek'),('Pikoló','Fúvós hangszerek'),('Szaxofon','Fúvós hangszerek'),('Tilinkó','Fúvós hangszerek'),('Trombita','Fúvós hangszerek'),('Tuba','Fúvós hangszerek'),('Akusztikus gitár','Húros hangszerek'),('Banjo','Húros hangszerek'),('Basszusgitár','Húros hangszerek'),('Brácsa','Húros hangszerek'),('Citera','Húros hangszerek'),('Cselló','Húros hangszerek'),('Hárfa','Húros hangszerek'),('Hegedű','Húros hangszerek'),('Lant','Húros hangszerek'),('Mandolin','Húros hangszerek'),('Nagybőgő','Húros hangszerek'),('Ukulele','Húros hangszerek'),('Cintányér','Ütős hangszerek'),('Csörgődob','Ütős hangszerek'),('Dobkészlet','Ütős hangszerek'),('Elektromos dob','Ütős hangszerek'),('Guiro','Ütős hangszerek'),('Harangjáték','Ütős hangszerek'),('Kalimba','Ütős hangszerek'),('Kézi dob','Ütős hangszerek'),('Maracas','Ütős hangszerek'),('Shaker','Ütős hangszerek'),('Tamburin','Ütős hangszerek'),('Vibrafon','Ütős hangszerek');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(75) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `pnumber` bigint NOT NULL,
  `password` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `review` float NOT NULL,
  `postalcode` int NOT NULL,
  `city` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `streetHnum` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `token` varchar(1024) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `ImageId` varchar(100) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `user_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (9,'Simon Dominik','dodo39766@gmail.com',36306015420,'/Sv82KbX9g1sOgRJ+l6EuQ==.PdnUbpJ2Ovyeww7WTu9pk6F81ktvwkDALZrDt6qLsQw=',4.25,9700,'Szombathely','Bogáti út 70','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZG9kbzM5NzY2QGdtYWlsLmNvbSIsInBlcm1pc3Npb24iOlsiSW5zdHJ1bWVudC5DcmVhdGUiLCJPcmRlckluZm8uUmVhZCIsIlVzZXIuUmVhZCIsIlVzZXIuVXBkYXRlIiwiVXNlci5EZWxldGUiLCJVc2VyLlBhdGNoIiwiSW5zdHJ1bWVudC5QYXRjaCIsIkZvcllvdS5SZWFkIiwiRm9yWW91LkNyZWF0ZSIsIkluc3RydW1lbnQuRGVsZXRlIiwiSW5zdHJ1bWVudC5SZWFkIiwiSW5zdHJ1bWVudC5VcGRhdGUiXSwiZXhwIjoxNzc1NDg0NTM5LCJpc3MiOiJodHRwczovL2hoYXBpLXk5YTl1Lm9uZGlnaXRhbG9jZWFuLmFwcCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3MyJ9.9bU6rsxf6nXKgIcLEfhbQrEvHum9cgzlWLFLfU_aiho','SimonDominik9'),(10,'Németh Balázs','nemeth.balazs@hbsz.edu.hu',301234567,'iRQGZ6qgBAarNPpyX8w+0A==.L0a7iDWCmb3OZZz7A2fm58OQsPn6J0MlNnfMxxAj0W8=',0,9752,'Bozzai','Fő utca 27','User',NULL,'NémethBalázs10'),(11,'Óvári Ákos','ovariakos06@gmail.com',36204343978,'cI398XRLw+uO8yCAHRj2QA==.bDsI+9ciSrvJAWSAlI+zJdygEEZrORbI3X29Dn3e0iM=',0,9798,'Ják','Kossuth Lajos utca 78','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoib3Zhcmlha29zMDZAZ21haWwuY29tIiwicGVybWlzc2lvbiI6WyJDYXRlZ29yeS5SZWFkIiwiSW5zdHJ1bWVudC5SZWFkIiwiSW5zdHJ1bWVudC5DcmVhdGUiLCJPcmRlckluZm8uUmVhZCIsIlN1YkNhdGVnb3J5LlJlYWQiLCJVc2VyLlJlYWQiLCJVc2VyLlVwZGF0ZSIsIlVzZXIuRGVsZXRlIl0sImV4cCI6MTc3MTM1MTYzMywiaXNzIjoiaHR0cHM6Ly9oaGFwaS15OWE5dS5vbmRpZ2l0YWxvY2Vhbi5hcHAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMifQ.M4uYFX7MDrk96PKjPdRUjcgb9-ONSF9FHxTzZyPVUmw','Óvári Ákos11'),(12,'Császár Bálint','csaszar.balint@hbsz.edu.hu',36302546562,'6rqdb3WmNsHVzSV1QI6lkw==.GWeH4LJb4xIhIvLTtqkuHWE1Zq/NTnSMRXAXFpDUtS8=',0,9700,'Szombathely','Zrínyi Ilona u. 12.','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiY3Nhc3phci5iYWxpbnRAaGJzei5lZHUuaHUiLCJwZXJtaXNzaW9uIjpbIkNhdGVnb3J5LlJlYWQiLCJJbnN0cnVtZW50LlJlYWQiLCJJbnN0cnVtZW50LkNyZWF0ZSIsIk9yZGVySW5mby5SZWFkIiwiU3ViQ2F0ZWdvcnkuUmVhZCIsIlVzZXIuUmVhZCIsIlVzZXIuVXBkYXRlIiwiVXNlci5EZWxldGUiXSwiZXhwIjoxNzcxMzIwMzc3LCJpc3MiOiJodHRwczovL2hoYXBpLXk5YTl1Lm9uZGlnaXRhbG9jZWFuLmFwcCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3MyJ9.96BTFzmbxEzIaPgO5vbtyOzY_YVg-uwnrVWZnVHaO18','Császár Bálint12'),(13,'Czibók Bence','czibok.bence@hbsz.edu.hu',36308196823,'T/ObD3dj+VBCwfJuNuD3Zw==.2KgAGNKsYiBEz122Wph5GbjKBihbcXDKJlPSDZDfzQg=',0,9754,'Pecöl','József Attila utca. 2','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiY3ppYm9rLmJlbmNlQGhic3ouZWR1Lmh1IiwicGVybWlzc2lvbiI6WyJDYXRlZ29yeS5SZWFkIiwiSW5zdHJ1bWVudC5SZWFkIiwiSW5zdHJ1bWVudC5DcmVhdGUiLCJPcmRlckluZm8uUmVhZCIsIlN1YkNhdGVnb3J5LlJlYWQiLCJVc2VyLlJlYWQiLCJVc2VyLlVwZGF0ZSIsIlVzZXIuRGVsZXRlIl0sImV4cCI6MTc3MzIyMjgxNSwiaXNzIjoiaHR0cHM6Ly9oaGFwaS15OWE5dS5vbmRpZ2l0YWxvY2Vhbi5hcHAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMifQ.uA2OOR6BNfla1XtcILsNO4UPUWHaju7FQUeXjiYe-lM','Czibók Bence13'),(14,'Sinka Levente','sinlevi14@gmail.com',36300829997,'CPQ5Vp3JVECuq12WvqnEPA==.+f0TPASa0a0Trluo48/vI40gkwYEXwRPaUJvaW4J1HI=',0,9682,'Nyőgér','Petőfi 30.','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2lubGV2aTE0QGdtYWlsLmNvbSIsInBlcm1pc3Npb24iOlsiQ2F0ZWdvcnkuUmVhZCIsIkluc3RydW1lbnQuUmVhZCIsIkluc3RydW1lbnQuQ3JlYXRlIiwiT3JkZXJJbmZvLlJlYWQiLCJTdWJDYXRlZ29yeS5SZWFkIiwiVXNlci5SZWFkIiwiVXNlci5VcGRhdGUiLCJVc2VyLkRlbGV0ZSJdLCJleHAiOjE3NzEzMjIwOTgsImlzcyI6Imh0dHBzOi8vaGhhcGkteTlhOXUub25kaWdpdGFsb2NlYW4uYXBwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIn0.7AGC3EWb2kUJLXK4nPLIuk6XGK5kQe1Z08kfazQ01Kg','Sinka Levente14'),(15,'Darunday Mariah Llianne','lliannemariah@gmail.com',36707238756,'meO7FhlDZW6rFEJe7yk4wA==.mQOLb6UmUYYxDvHV9LkUepvAkt43bCEKPBsZW2hEAoc=',0,9700,'Szombathely','Éhen Gyula tér 1','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibGxpYW5uZW1hcmlhaEBnbWFpbC5jb20iLCJwZXJtaXNzaW9uIjpbIkNhdGVnb3J5LlJlYWQiLCJJbnN0cnVtZW50LlJlYWQiLCJJbnN0cnVtZW50LkNyZWF0ZSIsIk9yZGVySW5mby5SZWFkIiwiU3ViQ2F0ZWdvcnkuUmVhZCIsIlVzZXIuUmVhZCIsIlVzZXIuVXBkYXRlIiwiVXNlci5EZWxldGUiXSwiZXhwIjoxNzcxMzI4MTE0LCJpc3MiOiJodHRwczovL2hoYXBpLXk5YTl1Lm9uZGlnaXRhbG9jZWFuLmFwcCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3MyJ9.sDK5yD6N-ACxgpBxuT0fAvwxQ_UvyIPBXiUg2eDpwGU','Darunday Mariah Llianne15'),(16,'Dénes Tamásné','denestamas1975@gmail.com',6303588891,'aoDvCw4wstXGxM8zm+75zw==.IVXx+eTr0RDtuXHRy30MAb3JKUPwYyTx9mTLaubRYKs=',0,9700,'Szombathely','Hét vezér utca 6b','User',NULL,'Dénes Tamásné16'),(17,'Megyeri Bence','megyeribence2006@gmail.com',6203462469,'KsTfDKIVpS4XFxAccFxBcQ==.MHI9W5SjtX+45w7/Wg4C+rOUKHxHGXV+Q+Rji4ZO9BY=',0,9761,'Táplánszentkereszt','Brenner János s. 23','User',NULL,'Megyeri Bence17'),(18,'Simon Szabolcs','simon.szabolcs117@gmail.com',307805633,'MClaHGAm4tOZPaixXKH+/w==.TKDgDrkuK7n1HXa1qiN+iG6qetQbUc+oL6YIim8zWqU=',0,9700,'Szombathely','Bogáti út 70','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2ltb24uc3phYm9sY3MxMTdAZ21haWwuY29tIiwicGVybWlzc2lvbiI6WyJDYXRlZ29yeS5SZWFkIiwiSW5zdHJ1bWVudC5SZWFkIiwiSW5zdHJ1bWVudC5DcmVhdGUiLCJPcmRlckluZm8uUmVhZCIsIlN1YkNhdGVnb3J5LlJlYWQiLCJVc2VyLlJlYWQiLCJVc2VyLlVwZGF0ZSIsIlVzZXIuRGVsZXRlIl0sImV4cCI6MTc3MTMzNzY4OSwiaXNzIjoiaHR0cHM6Ly9oaGFwaS15OWE5dS5vbmRpZ2l0YWxvY2Vhbi5hcHAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMifQ.IOq28EYZ2rCEmZeD6JQ8ZkcypcDpWMRwbfhlQ5VjUqg','Simon Szabolcs18'),(19,'Simon Szabolcsné','simonszabolcsne7@gmail.com',6303328334,'BpLTLmKBKB/sPN2japWVNw==.FGhUSjIjNvGhKFt5LHhYtp305u9qXiGrTX5h57ZPGSQ=',0,9700,'szombathely','bogáti út 70,','User',NULL,'Simon Szabolcsné19'),(20,'Dénes Tamás','horvathpanzio@gmail.com',6304111702,'m30/EKJU8s5UOXucdL3iSQ==.xt3kmADFsX7wiJ77BorUUs7hYHTU2Dmz4w/IrDJU0+U=',0,9700,'Szombathely','Hétvezér utca 6b','User',NULL,'Dénes Tamás20'),(21,'Horváth Gyuláné','horvathgyulane816@gmail.com',6309941057,'a8+JH5lzqi55b1PTmmWnZg==.GOqW6Z2P4ybkBnXUlrc8iK9UFXG/h8929/P7FceOFoI=',0,9700,'Szombathely','Bogáti út 65','User',NULL,'Horváth Gyuláné21'),(22,'Tóth Zsófia','toth.zsofi94@gmail.com',6305095002,'DoQeBGOX83EMpbuEv5N2EA==.AdFfaUmMwJvGYdQrg3GLopULvVrwaiS1TEYIWYt0v5U=',0,9700,'Szombathely','Bogáti út 101','User',NULL,'Tóth Zsófia22'),(23,'Kovács János','kovacsjani123@gmail.com',36308472649,'NWAoOTKMBIOZYfMQjZnbUA==.azno1Lky2+JS9a40dy/ycQk9HrWOBjt5970Wu0XT+W8=',0,9700,'Szombathely','Thökoly Imre utca 5','User',NULL,'Kovács János23'),(24,'Német Béla','nemetbela3@gmail.com',36703961457,'YuMHnRne6hqb+X9PgcbTVA==.etJabVfgpFwyfI5k07WR35SyPUavr9R4b2Hw80/UrWA=',0,9700,'Szombathely','Zanati út 7','User',NULL,'Német Béla24'),(25,'Kiss Imre','kissimre2@gmail.com',36408291185,'GDRTYJpsaX/NqrKnOW8ZgA==.YhygxJPvg9AkqSQ6pmDiTtPqpqAE0ijsGopKd3UqFXU=',0,9700,'Szombathely','Lázár János utca 11','User',NULL,'Kiss Imre25'),(26,'Nagy Péter','nagypeter7@gmail.com',36309985271,'BNWG6HPgS63Nc5GWiyUXzA==.D3lnfMMXQW6+EPspOHqLS3xyk4jtDxX0hVF6P1GybiQ=',0,9700,'Szombathely','Petőfi sándor utca. 9','User',NULL,'Nagy Péter26'),(27,'Horváth Ákos','horvathakos7@gmail.com',36307728651,'tNEJwfrdNYnnfFDZT8SaSg==.7ueTzC8ddW+lE+7/HAbhqSPiUTabj/uwI2mmsKWS0t4=',0,9700,'Szombathely','Vörösmarty Mihály utca 4.','User',NULL,'Horváth Ákos27'),(28,'Julian Xavier','julianxavier@gmail.com',36703925174,'qmfw83FtkCqSXMC67X/Ocw==.uhbta+BkiHgJYvHSYN/bvDk6O64ZOIjz905g/ooAyTE=',0,9700,'Szombathely','Nagy Imre utca 1.','User',NULL,'Julian Xavier28'),(29,'Gipsz Jakab','gipszjakab@gmail.com',201234567,'JXYycNgRgSZtDIHn9vdZ1w==.iTkLvtfMYpKsBL79O517i+tksIy4spGdHtYyZWylZ3c=',0,9700,'Szombathely','Fő tér 30','User',NULL,'Gipsz Jakab29'),(30,'Para Zita','parazita@gmail.com',301234567,'GjM4m0twOMdjW1TvmDTruQ==.yIVd+v6eoVohYujiZDBuxs2DBFzPulH0IE+JouQST04=',0,9700,'Szombathely','Thököly 21','User',NULL,'Para Zita30'),(36,'Hombárovics Tódor','hombarovicstodor@gmail.com',301237654,'LArAiZ14HH2pnZy28p2+Ew==.0QmOUlZB9L9A0Pzv0n3EUMY1Hq2t38ZWXma3ZdvHEGw=',0,1007,'Budapest ','Fiastyúk utca 32','User',NULL,'Hombárovics Tódor31'),(37,'Németh Balázs','bazsathelol@gmail.com',36301234567,'OLLU64ZDkA+Sklj8m1RCtg==.X0N6ULrxa4LcU7ocKqjuR7I5Gjw/uad+In/ipl1NBYk=',0,1111,'Ajka','Teszt utca 1.','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmF6c2F0aGVsb2xAZ21haWwuY29tIiwicGVybWlzc2lvbiI6WyJJbnN0cnVtZW50LkNyZWF0ZSIsIk9yZGVySW5mby5SZWFkIiwiVXNlci5SZWFkIiwiVXNlci5VcGRhdGUiLCJVc2VyLkRlbGV0ZSIsIkluc3RydW1lbnQuUGF0Y2giLCJGb3JZb3UuUmVhZCIsIkZvcllvdS5DcmVhdGUiXSwiZXhwIjoxNzc0MTk2NDUyLCJpc3MiOiJodHRwczovL2hoYXBpLXk5YTl1Lm9uZGlnaXRhbG9jZWFuLmFwcCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3MyJ9.f9H2kHoOsLfMGnXqq7O99LDABQXJ9u1I9bZqB4Hqzck','Németh Balázs37'),(38,'Alma Mater','Almamater379@gmail.com',301234567,'QpJfUQdGy2HPPxWrQcLStw==.BBUH23Z7ueMOqEg/yTKjssHFkDYYCqaZ9Hu+K6uCHaE=',0,9700,'Szombathely','Rumi út 45','User',NULL,'Alma Mater38');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'defaultdb'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-10 21:39:34
