-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 103.216.119.188    Database: taphoazalo
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `UserStatus`
--

DROP TABLE IF EXISTS `UserStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserStatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isOnline` tinyint(1) NOT NULL,
  `lastOnline` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserStatus_userId_key` (`userId`),
  KEY `UserStatus_isOnline_idx` (`isOnline`),
  CONSTRAINT `UserStatus_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserStatus`
--

LOCK TABLES `UserStatus` WRITE;
/*!40000 ALTER TABLE `UserStatus` DISABLE KEYS */;
INSERT INTO `UserStatus` VALUES (3,1,'2024-09-13 13:05:42.993','789b9f3e-4e5d-4451-90fb-6117578f8e47'),(4,0,'2024-09-02 08:20:55.906','6de1596e-52ef-482c-a63f-f7dfc8b7cce2'),(5,0,'2024-09-06 15:30:02.441','51ae7b06-6a06-4ae5-a59b-8d77ea29429c'),(6,0,'2024-09-13 14:05:36.994','9f28b4c2-539e-4d6e-9a10-d8710d6190f6'),(7,0,'2024-09-08 22:48:11.340','d6837dc2-20e7-4253-a487-635dd910052d'),(8,0,'2024-09-13 14:05:44.300','cb1a195a-d918-4a53-aea8-f6d0735414ab'),(9,0,'2024-09-02 04:16:06.069','526e69b0-d26f-475b-957e-db2ab8e9fb0f'),(10,0,'2024-09-10 14:13:47.748','90c184ee-3304-45a6-a7c0-07674dd62706'),(11,0,'2024-08-17 06:38:44.472','eea0f82a-ed5f-4578-bc34-1fd5e9e20ae9'),(12,0,'2024-09-12 04:47:43.777','5447adf4-225c-4ec5-acee-570c89f434f0'),(13,0,'2024-08-17 13:16:20.999','5c5a0ef8-9053-40ab-a4f0-64a36ddc1550'),(14,0,'2024-08-20 12:15:01.202','805d8296-b952-4c39-acbf-242d330bebd2'),(15,0,'2024-08-22 10:04:05.700','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf'),(16,0,'2024-09-12 12:04:38.065','7eef50a2-d5d6-4069-a8a0-9ff111bccb6f'),(17,0,'2024-08-31 06:51:25.153','44848200-52af-4c9a-8839-357b68d36ca7'),(18,0,'2024-08-27 12:44:07.146','ca3776c7-8db7-4a79-98f1-6136a7976bec'),(19,0,'2024-08-25 00:59:51.867','300dcf29-c57d-4a7c-b96f-9870fdb71487'),(20,0,'2024-08-25 14:01:59.233','ea63d1bd-7159-4c8b-849e-205bdcf71a75'),(21,0,'2024-08-31 07:23:27.720','e87ea926-3388-40ab-b46b-3c3f8a8e627a'),(22,0,'2024-08-31 11:33:24.753','9ec5c206-e5d6-45a0-8e45-14c78f39f2c6'),(26,0,'2024-08-31 08:33:43.481','35b34aac-d633-4cb3-aa10-c69b1a52e11b'),(27,0,'2024-09-12 15:38:48.580','74c4935f-6feb-4415-a8ea-e37526b8e54e'),(28,0,'2024-09-02 08:24:52.505','25129f5a-806a-4e59-96e4-de5e8faa3413'),(29,0,'2024-09-02 14:02:16.505','fdafa438-e72e-45a6-a943-3e17afd08153'),(30,0,'2024-09-05 09:57:18.940','2b42436d-ae9c-4a75-9191-ed1a386184a8'),(31,0,'2024-09-07 07:21:02.433','404f1d65-231f-472f-85f6-6a676ae7f7e7'),(32,0,'2024-09-07 13:48:09.097','7ff148e9-a5cd-4090-8f2a-97e5b6acc17c'),(33,1,'2024-09-13 13:28:31.098','2742d078-74b0-4867-b10d-9b30bae6a9f6');
/*!40000 ALTER TABLE `UserStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserTransaction`
--

DROP TABLE IF EXISTS `UserTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserTransaction` (
  `id` int NOT NULL,
  `tid` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `when` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserTransaction_tid_key` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserTransaction`
--

LOCK TABLES `UserTransaction` WRITE;
/*!40000 ALTER TABLE `UserTransaction` DISABLE KEYS */;
INSERT INTO `UserTransaction` VALUES (0,'MA_GIAO_DICH_THU_NGHIEM','giao dich thu nghiem',599000,'2024-08-16 13:11:49.000'),(7733474,'FT24229670863339','Nap tien MMOe78395b4',50000,'2024-08-16 13:20:41.000'),(7750700,'FT24232933031858','VO NGOC MINH chuyen tien',-50000,'2024-08-18 07:30:56.000'),(7753257,'FT24232123722832','PHAM TAN VINH chuyen tien',4000000,'2024-08-18 11:45:05.000'),(7756010,'FT24232076925054','Q00001vje6  APPMB530970 1  Thanh toan QR',-700000,'2024-08-18 17:30:24.000'),(7756478,'FT24232182277756','J5AKBDN',-2000000,'2024-08-18 23:54:02.000'),(7757926,'FT24232202253103','VO NGOC MINH chuyen tien',-1300000,'2024-08-19 02:42:47.000'),(7760478,'FT24232710084526','PHAM TAN VINH chuyen tien',3700000,'2024-08-19 06:08:32.000'),(7760509,'FT24232180545902','VO NGOC MINH chuyen tien- Ma GD ACSP/ G2143737',-3700000,'2024-08-19 06:11:45.000'),(7787587,'FT24234685513270','PHAM TAN VINH chuyen tien',1700000,'2024-08-21 10:26:50.000'),(7789239,'FT24234450640378','MUAHANGKATECESV - Ma giao dich/ Trace 745624',-1700000,'2024-08-21 12:44:02.000'),(7789798,'FT24234456282476','PHAM TAN VINH chuyen tien',850000,'2024-08-21 13:38:51.000'),(7790240,'FT24234983000223','VO NGOC MINH chuyen tien- Ma GD ACSP/ FH253234',-700000,'2024-08-21 14:21:54.000'),(7798608,'FT24235023919675','CHUYEN TIEN NHANH QUA QR - Ma giaodich/ Trace 221499',-65000,'2024-08-22 13:00:18.000'),(7799684,'FT24236710035138','VO NGOC MINH chuyen tien',99001,'2024-08-22 15:16:17.000'),(7817893,'FT24237805101114','PHZVNT VINAPHONE TOPUP 0835435486 BP00013iik0m NG CHUYEN:CUSTOMER',-50000,'2024-08-24 09:49:00.000'),(7821606,'FT24239440878706','VO NGOC MINH chuyen tien',-134000,'2024-08-24 20:28:48.000'),(7911347,'FT24246076564418','NAP TIEN MMO934E3A0D- Ma GD ACSP/ gM980693',100000,'2024-09-02 03:39:06.000'),(7919184,'FT24246031394354','nuoc ep - Ma giao dich/ Trace 356164',-60000,'2024-09-02 10:21:20.000'),(7929633,'FT24247148015409','VO NGOC MINH chuyen tien - Ma giaodich/ Trace 293984',-40000,'2024-09-03 06:42:13.000'),(7931174,'FT24247283100192','PHAN VAN DUONG chuyen tien',170000,'2024-09-03 09:02:03.000'),(7931567,'FT24247010718886','CHAY QUANG CAO 1 THANG- Ma GD ACSP/AP024502',480000,'2024-09-03 09:32:10.000'),(7931605,'FT24247978203229','CK- Ma GD ACSP/ Z3037106',360000,'2024-09-03 09:36:44.000'),(7931769,'FT24247564989107','VO NGOC MINH chuyen tien- Ma GD ACSP/ GC895981',-1000000,'2024-09-03 09:56:06.000'),(7932050,'FT24247694766291','Le Phuoc Loc chuyen tien   Ma giaodich  Trace853232 Trace 853232',480000,'2024-09-03 10:24:29.000'),(7932127,'FT24247133267094','KIEU NHI 2E BANK 15 TELE',360000,'2024-09-03 10:33:33.000'),(7932578,'FT24247420332771','VO NGOC MINH chuyen tien- Ma GD ACSP/ SD977473',-850000,'2024-09-03 11:30:09.000'),(7932719,'FT24247397707577','LE BAO CHAU chuyen tien',240000,'2024-09-03 11:48:13.000'),(7932979,'FT24248303400590','MBVCB.6936387031.772660.NaNa.CT tu1030969084 VO THI THAO VAN toi 88899999365 VO NGOC MINH tai MB- Ma GDACSP/ vz772660',240000,'2024-09-03 12:25:43.000'),(7933696,'FT24248383464070','LE BAO CHAU chuyen tien',160000,'2024-09-03 14:00:21.000'),(7934479,'FT24248537705948','MUAHANGKATFX7AD - Ma giao dich/ Trace 595879',-600000,'2024-09-03 18:03:00.000'),(7940470,'FT24248808412461','CHAY QUANG CAO 1 THANG- Ma GD ACSP/F0389729',500000,'2024-09-04 08:06:55.000'),(7943413,'FT24248810129403','MBVCB.6945093151.161855.ngota2d.CTtu 0211000525734 NGO VAN TUYEN toi88899999365 VO NGOC MINH tai MB- MaGD ACSP/ yy161855',740000,'2024-09-04 12:05:56.000'),(7944632,'FT24248270789440','MBVCB.6946157469.837862.zalo.CT tu0041000389306 DUONG THI THU HA toi88899999365 VO NGOC MINH tai MB- MaGD ACSP/ tk837862',130000,'2024-09-04 13:55:32.000'),(7945448,'FT24248093962067','VO NGOC MINH chuyen tien',-500000,'2024-09-04 15:29:12.000'),(7948240,'FT24249351432245','VO NGOC MINH chuyen tien- Ma GD ACSP/ FD126681',-130000,'2024-09-04 16:28:15.000'),(7949782,'FT24249789006548','Nd nhi gd van650K',-650000,'2024-09-05 01:48:50.000'),(7949807,'FT24249228350505','TRINH DUC CHIEN chuyen tien',100000,'2024-09-05 01:51:21.000'),(7950182,'FT24249075077669','chay quang cao 1 thang FT24249653500862   Ma giao dich  Trace127672 Trace 127672',400000,'2024-09-05 02:19:27.000'),(7952189,'FT24249028843444','IRIS TOPUP MOBIFONE TOPUP 0708888277 BP00014aimv6',-50000,'2024-09-05 04:56:28.000'),(7952204,'FT24249160685100','PHAM TAN VINH chuyen tien FT24249948565755   Ma giao dich  Trace840918Trace 840918',14500000,'2024-09-05 04:57:30.000'),(7952266,'FT24249008527418','VO NGOC MINH chuyen tien- Ma GD ACSP/ PH129533',-3000000,'2024-09-05 05:01:53.000'),(7952423,'FT24249180900676','MUAHANGKAT3JZ9T - Ma giao dich/ Trace 587293',-800000,'2024-09-05 05:17:00.000'),(8019953,'FT24255850723348','NGUYEN THI THANH THUAN CHUYEN TIEN-Ma GD ACSP/ A3817592',500000,'2024-09-11 06:56:11.000'),(8027814,'FT24256216643049','66642759562-Nap tien MMOf1f197d8-CHUYEN TIEN-OQCH10881498-e78a2fd2-73cf-4a3a-a7a4-e18c3d0c',10000,'2024-09-12 04:04:58.000'),(8042858,'FT24257782120898','Nap tien MMO6fb8a737',100000,'2024-09-13 13:24:39.000'),(8042874,'FT24257938596691','Nap tien MMO6fb8a737',600000,'2024-09-13 13:26:21.000');
/*!40000 ALTER TABLE `UserTransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('3e924abe-bc7d-436c-932f-f7f33e150982','955d92e2002055d5c158f16ba2bd5ae22fca1d10aff5574fd93fe81d4cdc7190','2024-09-10 18:40:11.588','20240910184010_init',NULL,NULL,'2024-09-10 18:40:11.394',1),('c2eb5b7c-1be2-41dc-9564-839b65901804','90435b5f56c0850e686ff06f006d42c395be993bb8a5e816b5aa42dbe40b6d65','2024-08-16 12:59:50.048','20240816125948_init',NULL,NULL,'2024-08-16 12:59:48.547',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','CUSTOMER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `status` enum('success','ide','cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ide',
  `response` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_userId_fkey` (`userId`),
  CONSTRAINT `contact_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `message_content_image_key` (`content`,`image`),
  KEY `message_userId_fkey` (`userId`),
  KEY `message_roomId_fkey` (`roomId`),
  CONSTRAINT `message_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (5,'hú',NULL,'2024-08-17 03:15:11.755','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(6,'tôi muốn bán hàng',NULL,'2024-08-17 03:15:15.065','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(7,'làm cách nào để tôi có thể bán hàng',NULL,'2024-08-17 03:15:22.322','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(8,'tôi đăng ký gian hàng thì lại out ra phần nói chuyện với nhân viên hỗ trợ',NULL,'2024-08-17 03:15:38.505','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(9,'làm sao để có thể',NULL,'2024-08-17 03:15:42.857','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(10,'ALO ',NULL,'2024-08-17 04:08:19.185','90c184ee-3304-45a6-a7c0-07674dd62706','5'),(11,'1',NULL,'2024-08-17 04:08:57.421','526e69b0-d26f-475b-957e-db2ab8e9fb0f','5'),(12,'1',NULL,'2024-08-17 04:08:59.468','526e69b0-d26f-475b-957e-db2ab8e9fb0f','5'),(13,'1',NULL,'2024-08-17 04:09:01.218','526e69b0-d26f-475b-957e-db2ab8e9fb0f','5'),(14,'1',NULL,'2024-08-17 04:09:01.681','526e69b0-d26f-475b-957e-db2ab8e9fb0f','5'),(15,'alo mua sao telegarm đi anh',NULL,'2024-08-17 04:09:18.590','526e69b0-d26f-475b-957e-db2ab8e9fb0f','5'),(16,'alo',NULL,'2024-08-17 12:28:25.046','cb1a195a-d918-4a53-aea8-f6d0735414ab','7'),(17,'rồi hàng của tôi đã mua đâu ?',NULL,'2024-08-17 12:28:31.904','cb1a195a-d918-4a53-aea8-f6d0735414ab','7'),(18,'rồi hàng đâu ?',NULL,'2024-08-17 12:47:32.922','cb1a195a-d918-4a53-aea8-f6d0735414ab','12'),(19,'1',NULL,'2024-08-19 12:12:43.429','cb1a195a-d918-4a53-aea8-f6d0735414ab','17'),(20,'đây',NULL,'2024-08-19 12:14:17.031','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','7'),(21,'1+',NULL,'2024-08-19 12:57:02.550','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','22'),(22,'1',NULL,'2024-08-19 13:19:00.601','cb1a195a-d918-4a53-aea8-f6d0735414ab','20'),(23,'1',NULL,'2024-08-19 13:48:54.072','cb1a195a-d918-4a53-aea8-f6d0735414ab','24'),(24,'1',NULL,'2024-08-19 13:49:19.303','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','24'),(25,'123123',NULL,'2024-08-19 13:49:34.631','cb1a195a-d918-4a53-aea8-f6d0735414ab','24'),(26,' luck (This method is not 100% work but can be)',NULL,'2024-08-19 13:49:50.241','cb1a195a-d918-4a53-aea8-f6d0735414ab','24'),(27,'anh iu em',NULL,'2024-08-19 13:51:19.159','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','24'),(28,'em có thể làm người iu anh được không em',NULL,'2024-08-19 13:51:51.106','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','24'),(29,'anh thích em lắm đó',NULL,'2024-08-19 13:52:02.302','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','24'),(30,'tạp hóa mmo ',NULL,'2024-08-19 13:52:04.806','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','24'),(31,'tạp hóa zalo trang sản phảm dịch vụ liên hệ dchia se4 faqs nạp tiền bán hàng số dư 0vnd thời gian hoạt đỗng của sàn 24/7',NULL,'2024-08-19 13:52:49.240','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','24'),(32,'rồi đơn hàng của tôi đâu ?',NULL,'2024-08-22 07:30:25.109','cb1a195a-d918-4a53-aea8-f6d0735414ab','24'),(33,'?',NULL,'2024-08-22 07:37:50.849','cb1a195a-d918-4a53-aea8-f6d0735414ab','29'),(34,'helo',NULL,'2024-08-25 07:11:46.923','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','29'),(35,'mày là ai',NULL,'2024-08-25 07:11:49.731','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','29'),(36,'Tôi muốn xin chính sách bán hàng ',NULL,'2024-08-27 12:03:48.054','ca3776c7-8db7-4a79-98f1-6136a7976bec','33'),(37,'1',NULL,'2024-09-02 03:45:14.134','74c4935f-6feb-4415-a8ea-e37526b8e54e','35'),(38,'a',NULL,'2024-09-02 04:03:37.178','90c184ee-3304-45a6-a7c0-07674dd62706','35'),(39,'na khùng',NULL,'2024-09-02 04:05:19.326','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','30'),(40,'na khùng',NULL,'2024-09-02 04:05:22.607','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','30'),(41,'hú',NULL,'2024-09-02 04:14:23.314','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(42,'na khùng',NULL,'2024-09-02 04:14:25.787','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(43,'na bị khùng',NULL,'2024-09-02 04:14:45.933','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(44,'huhuhuhuhuhuhuh',NULL,'2024-09-02 04:14:47.893','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(45,'asodosidwod',NULL,'2024-09-02 04:14:51.565','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(46,'na khùng na điên ',NULL,'2024-09-02 04:15:10.570','cb1a195a-d918-4a53-aea8-f6d0735414ab','2'),(47,'1',NULL,'2024-09-02 12:18:49.872','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','34'),(48,'1',NULL,'2024-09-10 07:54:36.779','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','41');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwordResetToken`
--

DROP TABLE IF EXISTS `passwordResetToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordResetToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `passwordResetToken_token_key` (`token`),
  KEY `passwordResetToken_userId_fkey` (`userId`),
  CONSTRAINT `passwordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwordResetToken`
--

LOCK TABLES `passwordResetToken` WRITE;
/*!40000 ALTER TABLE `passwordResetToken` DISABLE KEYS */;
INSERT INTO `passwordResetToken` VALUES (1,'a30557ec4ac3b6d2b7e511ffc2fd0b1132d8f39a52c1728be2abfc6296f6be28','51ae7b06-6a06-4ae5-a59b-8d77ea29429c','2024-08-16 14:24:03.993','2024-08-16 13:24:03.994','2024-08-16 13:24:03.994');
/*!40000 ALTER TABLE `passwordResetToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int DEFAULT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('success','cancel','ide','error') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ide',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_userId_fkey` (`userId`),
  CONSTRAINT `payments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postCategory`
--

DROP TABLE IF EXISTS `postCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postCategory`
--

LOCK TABLES `postCategory` WRITE;
/*!40000 ALTER TABLE `postCategory` DISABLE KEYS */;
INSERT INTO `postCategory` VALUES (1,'Facebook','facebook'),(2,'Nội dung khác','noi-dung-khac'),(3,'Tik tok','tik-tok'),(4,'Marketing','marketing'),(5,'Telegram','telegram'),(6,'TapHoaMMO','taphoammo'),(7,'Youtube','youtube'),(8,'Airdrop','airdrop'),(9,'Zalo','zalo');
/*!40000 ALTER TABLE `postCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postDonates`
--

DROP TABLE IF EXISTS `postDonates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postDonates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `postDonates_content_key` (`content`),
  KEY `postDonates_userId_fkey` (`userId`),
  KEY `postDonates_postId_fkey` (`postId`),
  CONSTRAINT `postDonates_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `postDonates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postDonates`
--

LOCK TABLES `postDonates` WRITE;
/*!40000 ALTER TABLE `postDonates` DISABLE KEYS */;
/*!40000 ALTER TABLE `postDonates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postLikes`
--

DROP TABLE IF EXISTS `postLikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postLikes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postLikes_userId_fkey` (`userId`),
  KEY `postLikes_postId_fkey` (`postId`),
  CONSTRAINT `postLikes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `postLikes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postLikes`
--

LOCK TABLES `postLikes` WRITE;
/*!40000 ALTER TABLE `postLikes` DISABLE KEYS */;
INSERT INTO `postLikes` VALUES (4,'2024-09-12 04:04:38.251','7eef50a2-d5d6-4069-a8a0-9ff111bccb6f',4),(5,'2024-09-12 04:06:11.407','74c4935f-6feb-4415-a8ea-e37526b8e54e',4);
/*!40000 ALTER TABLE `postLikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postPomments`
--

DROP TABLE IF EXISTS `postPomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postPomments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `postPomments_content_key` (`content`),
  KEY `postPomments_userId_fkey` (`userId`),
  KEY `postPomments_postId_fkey` (`postId`),
  CONSTRAINT `postPomments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `postPomments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postPomments`
--

LOCK TABLES `postPomments` WRITE;
/*!40000 ALTER TABLE `postPomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `postPomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postViews`
--

DROP TABLE IF EXISTS `postViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postViews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postViews_userId_fkey` (`userId`),
  KEY `postViews_postId_fkey` (`postId`),
  CONSTRAINT `postViews_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `postViews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postViews`
--

LOCK TABLES `postViews` WRITE;
/*!40000 ALTER TABLE `postViews` DISABLE KEYS */;
INSERT INTO `postViews` VALUES (1,'2024-08-25 06:14:17.974','9f28b4c2-539e-4d6e-9a10-d8710d6190f6',4),(2,'2024-08-25 06:14:37.509','90c184ee-3304-45a6-a7c0-07674dd62706',4),(3,'2024-08-25 13:59:35.328','ea63d1bd-7159-4c8b-849e-205bdcf71a75',4),(4,'2024-09-01 13:50:58.352','5447adf4-225c-4ec5-acee-570c89f434f0',4),(5,'2024-09-02 12:35:24.384','cb1a195a-d918-4a53-aea8-f6d0735414ab',4),(6,'2024-09-12 04:03:33.361','7eef50a2-d5d6-4069-a8a0-9ff111bccb6f',4),(7,'2024-09-12 09:16:39.675','cb1a195a-d918-4a53-aea8-f6d0735414ab',5),(8,'2024-09-12 09:17:16.185','74c4935f-6feb-4415-a8ea-e37526b8e54e',5),(9,'2024-09-12 11:12:38.260','9f28b4c2-539e-4d6e-9a10-d8710d6190f6',5);
/*!40000 ALTER TABLE `postViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('cancel','success','ide','error') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ide',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `postCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_key` (`slug`),
  KEY `posts_userId_fkey` (`userId`),
  KEY `posts_postCategoryId_fkey` (`postCategoryId`),
  CONSTRAINT `posts_postCategoryId_fkey` FOREIGN KEY (`postCategoryId`) REFERENCES `postCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,'Cách hạn chế die acc Zalo và những lưu ý căn bản người sử dụng cần biết','<p>ZALO ĐANG QUÉT RẤT MẠNH VÀ HẠN CHẾ ĐĂNG NHẬP QUA MÁY KHÁC QUÁ NHIỀU&nbsp;</p><p>TRƯỜNG HỢP BỊ KHÓA CHỨC NĂNG</p><p><strong style=\"color: rgb(23, 181, 41);\"><em>1900561558 bấm phím 2 nếu zalo bị chặn tin nhắn thì gọi kêu mở nhé trong 72H sẽ được mở</em></strong></p><p><strong>–Mua Về Nên Login Bằng 4G Để Hạn Chế Bị Khóa(</strong><strong style=\"color: rgb(232, 42, 31);\">Không Dùng Wifi</strong><strong>).</strong></p><p><strong>– Login IP &amp; Thiết Bị Sạch(</strong><strong style=\"color: rgb(0, 142, 2);\">Thiết Bị Sạch Là Chưa Từng Có Tài Khoản Bị Khóa</strong><strong>)Để Tài Khoản Được Khỏe Nhất Và Có Độ Trust Cao.</strong></p><p><strong>– Không Nên Login Quá Nhiều Tài Khoản Trên Cùng 1 Thiết Bị &amp; IP Tối Đa 3 Tài Khoản(</strong><strong style=\"color: rgb(232, 42, 31);\">Login Nhiều Nữa Thì Nên Chấp Nhận Rủi Ro</strong><strong>)</strong></p><p><strong>– Login PC Thì Nên Dùng Giả Lập Điện Thoại &amp; Tham Khảo Thêm Tool Nuôi Zalo(</strong><strong style=\"color: rgb(232, 42, 31);\">Tool Phù Hợp Cho Người Dùng Rất Nhiều Tài Khoản</strong><strong>).</strong></p><p><strong style=\"color: rgb(33, 37, 41);\">* Lưu ý khi sử dụng tài khoản zalo Lưu hành nội bộ.</strong></p><p><br></p><p>Nhữn<span style=\"color: rgb(33, 37, 41);\">g nguyên nhân chủ yếu khiến zalo bị khóa tài khoản do vi phạm chính sách của zalo:</span></p><p><br></p><p>&nbsp;&nbsp;1<span style=\"color: rgb(33, 37, 41);\">.&nbsp;Login vào bị khóa luôn tài khoản, không kịp làm gì cả: Lý do zalo đã gim thiết bị xấu và ip xấu. ( Do trước đó thiết bị đã có tài khoản bị khóa hoặc đăng nhập nhiều tài khoản trên 1 thiết bị hoặc liên tục đăng xuất đăng nhập nhiều tài khoản trên 1 thiết bị).</span></p><p><br></p><p>&nbsp;&nbsp;<span style=\"color: rgb(33, 37, 41);\">&nbsp;&nbsp;- Khắc phục: Dùng tool Fake devide (thông số thiết bị) cho thiết bị và reset ip 3g hoặc&nbsp;xóa zalo đi, tắt máy đợi qua ngày mới dùng lại. Sử dụng ip 3g riêng cho từng máy.</span></p><p><br></p><p>&nbsp;<span style=\"color: rgb(33, 37, 41);\">&nbsp;2.&nbsp;Login 1 thời gian mà chưa làm gì tài khoản tự khóa: Lý do hoặc thiết bị xấu hoặc ip xấu (trùng ip). Hoặc login vào đổi thông tin khiến zalo nhận ra hoạt động bất thường.</span></p><p><br></p><p><span style=\"color: rgb(33, 37, 41);\">&nbsp;&nbsp;&nbsp;&nbsp;- Khắc phục: Trước khi login khởi động lại máy, xóa lịch sử bộ nhớ tạm zalo đi. Sau khi login tài khoản thì không được đổi thông tin ngay. Ản online đi và ngâm ít nhất 1 ngày cho quen thiết bị mới đổi thông tin và ít nhất 1 ngày sau mới làm việc. Sử dụng ip 3g riêng cho từng máy.</span></p><p><span style=\"color: rgb(33, 37, 41);\">&nbsp;&nbsp;3.&nbsp;Login sử dụng bị khóa : Lý do như gửi tin nhắn có nội dung nhạy cảm, nội dung quảng cáo…hoặc bị báo xấu làm phiền, hoặc hành vi bất thường như kết bạn nhắn tin với quá nhiều người lạ…</span></p><p><span style=\"color: rgb(33, 37, 41);\">&nbsp;&nbsp;&nbsp;&nbsp;- Khắc phục: Khi Làm việc giãn cách thời gian kết bạn hoặc nhắn tin ra không nên spam hàng loạt, hạn chế copy pase 1 nội dung. Gửi khoảng 3 4 lời mời kb hoặc 3, 4 tin nhắn xong nghỉ khoảng 15 20 phút tiếp tục làm. Một ngày zalo sẽ giới hạn số lượng tin nhắn cho người lạ, quá số lần gửi tin sẽ bị chặn tính năng trong 3 ngày hoặc 1 tuần hoặc khóa tài khoản.</span></p><p><br></p><p>Làm sạch IP 3g. (Tuyệt đối ko <span style=\"color: rgb(33, 37, 41);\">dùng wife). Làm mới bằng cách khởi động lại điện thoại hoặc bật tắt máy bay.</span></p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;- Một điện thoại chỉ nên<span style=\"color: rgb(33, 37, 41);\"> sử dụng 1 tài khoản zalo duy nhất (Nếu dùng nhiều tài khoản thì chỉ cần 1 tài khoản bị chặn, khóa là ảnh hưởng đến tất cả các tài khoản đang có trên điện thoạ</span>i đó)</p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;- Mỗi ngày chỉ nên đăng nh<span style=\"color: rgb(33, 37, 41);\">ập 1 hoặc 2 tài </span>khoản.</p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;- Phải giãn cách thời gian đăng<span style=\"color: rgb(33, 37, 41);\"> nhập trên 1 thiết bị trên </span>8 tiếng</p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;- Hạn chế chuyển tài khoản nhiều lầ<span style=\"color: rgb(33, 37, 41);\">n trên 1 th</span>iết bị.</p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;- Login xong vào cài đặt ẩn đăng nhập, ẩn tì<span style=\"color: rgb(33, 37, 41);\">m zalo bằng số điện thoại...để tránh</span> bị báo xấu.</p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;- Khi đăng nhập, không được đổi thông tin, pass trong ngày v<span style=\"color: rgb(33, 37, 41);\">ì dễ di</span>e nick</p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;- Nên đăng nhập vào điện thoại ngâm 1 đến 3 ngày để quen thiế<span style=\"color: rgb(33, 37, 41);\">t bị mới rồi mới đổi thông tin. Đổi thông tin sau 3 ngày mới sử dụng thì sẽ ít bị quét, í</span>t die nick</p>','https://api.taphoazalo.com/api/image/uploads/posts/post-1724566423591-491043540.jpg','cach-han-che-die-acc-zalo-va-nhung-luu-y-can-ban-nguoi-su-dung-can-biet','success','2024-08-25 06:13:43.598','2024-09-13 08:02:50.175','9f28b4c2-539e-4d6e-9a10-d8710d6190f6',NULL),(5,'Cách kiếm tra List bạn bè có phải bạn bè thật hay chỉ là clone !!','<p>Dành cho các bạn đang bán hàng trên nên tảng Facebook, cụ thể trên trang cá nhân của. Bạn muốn kiểm tra nick mình có phải là bạn bè thật hay clone thì hôm nay mình sẽ hướng dẫn bạn kiểm tra nhé ( mang tính tương đối nhé )</p><p>B1: Bạn đăng nhập nick FB muốn kiểm tra vào điện thoại</p><p>B2:Bạn vào phần 3 sọc trên góc màn hình&nbsp;</p><p><img src=\"https://taphoammo.net/img/post/z5621958487452_aad8a1664cc0aad8daf8994c2ef57e4b.jpg\"></p><p>B3: Bạn check mục bạn bè . nếu bạn bè online thường xuyên và ổn định thì 100% là bạn bè thật nhé&nbsp;</p><p><img src=\"https://taphoammo.net/img/post/z5621971928517_fe3164c520dce8000572d3e7fa28bb03.jpg\"></p><p>&nbsp;</p><p>Chúc mọi người một ngày tốt lành !</p>','https://api.taphoazalo.com/api/image/uploads/posts/post-1726117169524-865740115.jpg','cach-kiem-tra-list-ban-be-co-phai-ban-be-that-hay-chi-la-clone','success','2024-09-12 04:59:29.533','2024-09-13 08:02:49.543','74c4935f-6feb-4415-a8ea-e37526b8e54e',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productAccount`
--

DROP TABLE IF EXISTS `productAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productAccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sold` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `poachedId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productAccount_poachedId_fkey` (`poachedId`),
  CONSTRAINT `productAccount_poachedId_fkey` FOREIGN KEY (`poachedId`) REFERENCES `productSales` (`poached`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productAccount`
--

LOCK TABLES `productAccount` WRITE;
/*!40000 ALTER TABLE `productAccount` DISABLE KEYS */;
INSERT INTO `productAccount` VALUES (1,'e5303e1e94ec48aa@gmail.com','5547f38991d718e1',1,'2024-08-16 13:32:48.924','2024-08-16 13:33:14.729','1212'),(2,'de23b62a5c0c39ff@gmail.com','a4e5791975dd22b0',1,'2024-08-16 13:32:48.924','2024-08-16 13:33:14.729','1212'),(3,'a5d854b470790c30@gmail.com','833e2f33485383c2',1,'2024-08-16 13:32:48.924','2024-08-16 13:33:14.729','1212'),(4,'de6ecf3a7e74e047@gmail.com','f4aea87fa5e1a3e1',1,'2024-08-16 13:32:48.924','2024-08-16 13:33:14.729','1212'),(5,'43e56cdab6fa93dd@gmail.com','a50f4c5d76e39e75',1,'2024-08-16 13:32:48.924','2024-08-16 13:33:14.729','1212'),(6,'2b0e1b86b34f6d34@gmail.com','2c13a434bc8004e5',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(7,'6d2253357774f071@gmail.com','1d44156a94ed48b1',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(8,'a143da25d5c65900@gmail.com','76a646644e13161b',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(9,'3216445153306dc6@gmail.com','c27b0693b5cb47c1',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(10,'a92be53dcaeec4bf@gmail.com','92da2600675df5d8',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(11,'eb89dea85634c48b@gmail.com','c257024570858ff6',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(12,'1f75c41fb3fad698@gmail.com','5f3d13e0a03c6bb0',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(13,'bc8d96fb528d138f@gmail.com','c200f44b37f18933',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(14,'d0c6fd14f22c932f@gmail.com','4a06658ae8bb6d39',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(15,'80f95baa348f1a0b@gmail.com','d6702431134a8872',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(16,'824af9cd6a67372c@gmail.com','f1bd0738d0a9c747',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(17,'20094257f663a8c2@gmail.com','efa410012362376e',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(18,'c11eb378a7719902@gmail.com','df42fd9b48e2cd46',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(19,'2e10cca3621e716b@gmail.com','a121d7ea126cbf14',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(20,'5e4432a6b0c13da5@gmail.com','04ba03dfd8490dfa',0,'2024-08-16 13:32:48.924','2024-08-16 13:32:48.924','1212'),(21,'nfsadjsahda@gmail.com','dsadsafsdfds',0,'2024-08-16 13:43:57.734','2024-08-16 13:43:57.734','534'),(22,'dsadsadsa@dsadsaf','dsadsadas',0,'2024-08-16 13:44:03.444','2024-08-16 13:44:03.444','534'),(23,'nguyeandsa@âmil','sdsadsa',0,'2024-08-16 13:45:29.267','2024-08-16 13:45:29.267','671'),(24,'nguyessandsa@âmil','sdsadsa',0,'2024-08-16 13:45:29.267','2024-08-16 13:45:29.267','671'),(25,'nguyessandsa@âmil','sdsadsa',0,'2024-08-16 13:45:29.267','2024-08-16 13:45:29.267','671'),(26,'ngsuyeandsa@âmil','sdsadsa',0,'2024-08-16 13:45:29.267','2024-08-16 13:45:29.267','671'),(27,'nguyeaandsa@âmil','sdsadsa',0,'2024-08-16 13:45:29.267','2024-08-16 13:45:29.267','671'),(28,'0812525127','095623aA@',1,'2024-08-19 12:18:54.592','2024-08-19 12:24:24.323','828'),(29,'0362216993','095623aA@',1,'2024-08-19 12:20:04.335','2024-08-19 12:25:41.022','828'),(30,'0326161664','095623aA@',1,'2024-08-19 12:20:38.595','2024-09-02 12:20:14.851','828'),(31,'0369599548','095623aA@',1,'2024-08-19 12:20:49.518','2024-09-13 13:26:44.248','828'),(32,'0954455198','095623aA@',0,'2024-08-19 13:32:09.981','2024-08-19 13:32:09.981','631'),(33,'0515516966','095623aA@',1,'2024-08-21 13:37:14.359','2024-09-13 13:27:57.287','828'),(34,'0541446943','095623aA@',0,'2024-08-21 13:37:35.248','2024-08-21 13:37:35.248','828'),(36,'100092719221053','pkiuevniwe@plnudzdlkz',1,'2024-09-02 12:14:26.986','2024-09-02 12:15:57.677','564');
/*!40000 ALTER TABLE `productAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productAccountSold`
--

DROP TABLE IF EXISTS `productAccountSold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productAccountSold` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productOrdersId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productAccountSold_productOrdersId_fkey` (`productOrdersId`),
  CONSTRAINT `productAccountSold_productOrdersId_fkey` FOREIGN KEY (`productOrdersId`) REFERENCES `productOrders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productAccountSold`
--

LOCK TABLES `productAccountSold` WRITE;
/*!40000 ALTER TABLE `productAccountSold` DISABLE KEYS */;
INSERT INTO `productAccountSold` VALUES (1,'100092719221053','pkiuevniwe@plnudzdlkz','f3360e'),(2,'0326161664','095623aA@','3ba2ed'),(3,'0369599548','095623aA@','461eb9'),(4,'0515516966','095623aA@','8f3914');
/*!40000 ALTER TABLE `productAccountSold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productCategory`
--

DROP TABLE IF EXISTS `productCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryCover` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productCategory`
--

LOCK TABLES `productCategory` WRITE;
/*!40000 ALTER TABLE `productCategory` DISABLE KEYS */;
INSERT INTO `productCategory` VALUES (1,'Tài khoản','tai-khoan'),(2,'Email','email'),(3,'Phần mềm','phan-mem'),(4,'Khác','khac');
/*!40000 ALTER TABLE `productCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productFile`
--

DROP TABLE IF EXISTS `productFile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productFile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `productOrdersId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productFile_productOrdersId_fkey` (`productOrdersId`),
  KEY `productFile_userId_fkey` (`userId`),
  CONSTRAINT `productFile_productOrdersId_fkey` FOREIGN KEY (`productOrdersId`) REFERENCES `productOrders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `productFile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productFile`
--

LOCK TABLES `productFile` WRITE;
/*!40000 ALTER TABLE `productFile` DISABLE KEYS */;
INSERT INTO `productFile` VALUES (1,'06f5d0-cc5b3859.csv','2024-08-16 13:33:14.716','06f5d0','51ae7b06-6a06-4ae5-a59b-8d77ea29429c'),(2,'0c0c28-4becf1fb.csv','2024-08-19 12:24:24.306','0c0c28','cb1a195a-d918-4a53-aea8-f6d0735414ab'),(3,'066d5c-e0053b45.csv','2024-08-19 12:25:41.009','066d5c','cb1a195a-d918-4a53-aea8-f6d0735414ab'),(4,'f3360e-2d5e6a09.csv','2024-09-02 12:15:57.658','f3360e','cb1a195a-d918-4a53-aea8-f6d0735414ab'),(5,'3ba2ed-fdd391c2.csv','2024-09-02 12:20:14.833','3ba2ed','cb1a195a-d918-4a53-aea8-f6d0735414ab'),(6,'461eb9-dde8c0e4.csv','2024-09-13 13:26:44.233','461eb9','2742d078-74b0-4867-b10d-9b30bae6a9f6'),(7,'8f3914-fa904067.csv','2024-09-13 13:27:57.268','8f3914','cb1a195a-d918-4a53-aea8-f6d0735414ab');
/*!40000 ALTER TABLE `productFile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productOrders`
--

DROP TABLE IF EXISTS `productOrders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productOrders` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `unitPrice` int NOT NULL,
  `sale` int NOT NULL,
  `total` int NOT NULL,
  `refund` int NOT NULL,
  `status` enum('create','success','refund','cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'create',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `productSaleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productOrders_userId_fkey` (`userId`),
  KEY `productOrders_productId_fkey` (`productId`),
  KEY `productOrders_productSaleId_fkey` (`productSaleId`),
  CONSTRAINT `productOrders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `productOrders_productSaleId_fkey` FOREIGN KEY (`productSaleId`) REFERENCES `productSales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `productOrders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productOrders`
--

LOCK TABLES `productOrders` WRITE;
/*!40000 ALTER TABLE `productOrders` DISABLE KEYS */;
INSERT INTO `productOrders` VALUES ('066d5c',1,700000,0,700000,0,'success','2024-08-19 12:25:41.009','2024-09-12 04:46:15.199','cb1a195a-d918-4a53-aea8-f6d0735414ab',8,25),('06f5d0',5,49430,0,49430,0,'create','2024-08-16 13:33:14.716','2024-08-16 13:33:14.716','51ae7b06-6a06-4ae5-a59b-8d77ea29429c',NULL,4),('0c0c28',1,700000,0,700000,0,'success','2024-08-19 12:24:24.306','2024-09-12 04:46:16.573','cb1a195a-d918-4a53-aea8-f6d0735414ab',8,25),('3ba2ed',1,700000,0,700000,0,'success','2024-09-02 12:20:14.833','2024-09-12 04:46:18.664','cb1a195a-d918-4a53-aea8-f6d0735414ab',8,25),('461eb9',1,700000,0,700000,0,'create','2024-09-13 13:26:44.233','2024-09-13 13:26:44.233','2742d078-74b0-4867-b10d-9b30bae6a9f6',8,25),('8f3914',1,700000,0,700000,0,'create','2024-09-13 13:27:57.268','2024-09-13 13:27:57.268','cb1a195a-d918-4a53-aea8-f6d0735414ab',8,25),('f3360e',1,499000,0,499000,0,'create','2024-09-02 12:15:57.658','2024-09-02 12:15:57.658','cb1a195a-d918-4a53-aea8-f6d0735414ab',20,38);
/*!40000 ALTER TABLE `productOrders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productReviews`
--

DROP TABLE IF EXISTS `productReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productReviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productReviews_userId_fkey` (`userId`),
  KEY `productReviews_productId_fkey` (`productId`),
  CONSTRAINT `productReviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `productReviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productReviews`
--

LOCK TABLES `productReviews` WRITE;
/*!40000 ALTER TABLE `productReviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `productReviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productSales`
--

DROP TABLE IF EXISTS `productSales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productSales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `poached` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `productSales_poached_key` (`poached`),
  KEY `productSales_productId_fkey` (`productId`),
  CONSTRAINT `productSales_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productSales`
--

LOCK TABLES `productSales` WRITE;
/*!40000 ALTER TABLE `productSales` DISABLE KEYS */;
INSERT INTO `productSales` VALUES (1,'Gmail tên Việt, đăng kí tay, nuôi lâu, đã kháng về rất cứng',18000,'1422',NULL),(2,'Gmail Việt 2023, đăng kí tay, bao chất lượng , cực trâu',28000,'1332',NULL),(3,'Gmail Việt cổ 2018-2022  chất lượng , mua sll vui lòng ib',45000,'1142',NULL),(4,'Gmail Việt new 2024 đăng kí tay, chất lượng, cực trâu',9886,'1212',NULL),(5,'Gmail Việt SIÊU CỔ ĐẠI năm tạo 2006-2014 cực vip',97979,'25421',NULL),(6,'Gmail tên Việt, đăng kí tay, nuôi lâu, đã kháng về rất cứng',18000,'14124',NULL),(7,'Gmail Việt 2023, đăng kí tay, bao chất lượng , cực trâu',28000,'23113',NULL),(8,'Gmail Việt cổ 2018-2022  chất lượng , mua sll vui lòng ib',45000,'14351',NULL),(9,'Gmail Việt new 2024 đăng kí tay, chất lượng, cực trâu',9886,'87612',NULL),(10,'Gmail Việt SIÊU CỔ ĐẠI năm tạo 2006-2014 cực vip',97979,'209075',NULL),(11,'Gmail tên Việt, đăng kí tay, nuôi lâu, đã kháng về rất cứng',18000,'1fsd4',NULL),(12,'Gmail Việt 2023, đăng kí tay, bao chất lượng , cực trâu',28000,'1fdsf3',NULL),(13,'Gmail Việt cổ 2018-2022  chất lượng , mua sll vui lòng ib',45000,'fssf11',NULL),(14,'Gmail Việt new 2024 đăng kí tay, chất lượng, cực trâu',9886,'fdsf12',NULL),(15,'Gmail Việt SIÊU CỔ ĐẠI năm tạo 2006-2014 cực vip',97979,'fdsf25',NULL),(16,'Gmail tên Việt, đăng kí tay, nuôi lâu, đã kháng về rất cứng',18000,'fdsgfh14',NULL),(17,'Gmail Việt 2023, đăng kí tay, bao chất lượng , cực trâu',28000,'jhgkj13',NULL),(18,'Gmail Việt cổ 2018-2022  chất lượng , mua sll vui lòng ib',45000,'11ljkjgf',NULL),(19,'Gmail Việt new 2024 đăng kí tay, chất lượng, cực trâu',9886,'4323412',NULL),(20,'Gmail Việt SIÊU CỔ ĐẠI năm tạo 2006-2014 cực vip',97979,'2768985',NULL),(21,'Gmail ảo 2023',7000,'534',NULL),(22,'Gmail ảo 2022',5000,'671',NULL),(23,'Tút làm page xmdt kích lại via xịt xmdt',100000,'830',NULL),(24,'ZALO NĂM CỔ',650000,'741',7),(25,'Zalo năm cổ siêu trâu chó',700000,'828',8),(26,'ZALO THÁNG XMDT, BẢO HÀNH 24H',500000,'709',9),(27,'ZALO NEW XMDT',190000,'569',10),(28,'ZALO CỔ XMDT',550000,'679',11),(29,'ZALO NEW XMDT - BH24H',400000,'780',12),(30,'ZALO THÁNG XMDT',300000,'872',13),(31,'Zalo năm cổ siêu trâu bảo hành 24h',590000,'631',14),(32,'ZALO BUSINES BASIC',1400000,'857',15),(33,'ZALO BUSINESS PRO',3300000,'579',16),(34,' ZALO NEW SPAM CHƯA XMDT',110,'529',NULL),(35,' ZALO NEW SPAM CHƯA XMDT',110000,'884',18),(36,'FB BÀI ĐĂNG RANDOM	',300,'707',NULL),(37,'FB BÀI ĐĂNG RANDOM	',700,'513',NULL),(38,'Via Cổ Có Tương Tác, Comment, BV Từ 2020 - 2024',499000,'564',20);
/*!40000 ALTER TABLE `productSales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productSubCategory`
--

DROP TABLE IF EXISTS `productSubCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productSubCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subCategory` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productSubCategory_categoryId_fkey` (`categoryId`),
  CONSTRAINT `productSubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `productCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productSubCategory`
--

LOCK TABLES `productSubCategory` WRITE;
/*!40000 ALTER TABLE `productSubCategory` DISABLE KEYS */;
INSERT INTO `productSubCategory` VALUES (1,'Tài khoản FB',1),(2,'Tài Khoản BM',1),(3,'Tài Khoản Zalo',1),(4,'Tài Khoản Twitter',1),(5,'Tài Khoản Telegram',1),(6,'Tài Khoản Instagram',1),(7,'Tài Khoản Shopee',1),(8,'Tài Khoản Discord',1),(9,'Tài khoản TikTok',1),(10,'Key Diệt Virus',1),(11,'Key Window',1),(12,'Tài Khoản Khác',1),(13,'Gmail',2),(14,'HotMail',2),(15,'OutlookMail',2),(16,'RuMail',2),(17,'DomainMail',2),(18,'YahooMail',2),(19,'ProtonMail',2),(20,'Loại Mail Khác',2),(21,'Phần Mềm FB',3),(22,'Phần Mềm Google',3),(23,'Phần Mềm Youtube',3),(24,'Phần Mềm Tiền Ảo',3),(25,'Phần Mềm PTC',3),(26,'Phần Mềm Capcha',3),(27,'Phần Mềm Offer',3),(28,'Phần Mềm PTU',3),(29,'Phần Mềm Khác',3),(30,'Thẻ nạp',4),(31,'VPS',4),(32,'Khác',4);
/*!40000 ALTER TABLE `productSubCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productViews`
--

DROP TABLE IF EXISTS `productViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productViews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productViews_userId_fkey` (`userId`),
  KEY `productViews_productId_fkey` (`productId`),
  CONSTRAINT `productViews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `productViews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productViews`
--

LOCK TABLES `productViews` WRITE;
/*!40000 ALTER TABLE `productViews` DISABLE KEYS */;
/*!40000 ALTER TABLE `productViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duplicate` tinyint(1) NOT NULL DEFAULT '0',
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('cancel','success','ide','error') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ide',
  `reseller` tinyint(1) NOT NULL DEFAULT '0',
  `sponsor` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiving` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `subCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_key` (`slug`),
  KEY `products_userId_fkey` (`userId`),
  KEY `products_categoryId_fkey` (`categoryId`),
  KEY `products_subCategoryId_fkey` (`subCategoryId`),
  CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `productCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `productSubCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (7,'ZALO NĂM CỔ SIÊU TRÂU BẢO HÀNH 24H','CÓ ZALO CỖ NĂM ĐẢM BẢO TRÂU, BẢO HÀNH 24H','<p>ZALO CỔ BAO GỒM :</p><p>✅ BẢO HÀNH 24H (KÈM PROXY)</p><p>✅ XÁC THỰC CỨNG 1 -&gt; 3 NĂM TỪ 10 -&gt; 500BB</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724068931019-403638823.jpg',1,'zalo-nam-co-sieu-trau-bao-hanh-24h','success',1,0,'2024-08-19 12:02:11.041','2024-08-19 12:13:53.177','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','3',1,3),(8,'Zalo năm cổ siêu trâu chó','Zalo năm cổ siêu trâu chó','<p>Zalo năm cổ siêu trâu chó</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724069900461-534854884.jpg',1,'zalo-nam-co-sieu-trau-cho','success',1,0,'2024-08-19 12:18:20.511','2024-08-19 12:19:20.101','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',1,3),(9,'BÁN ZALO THÁNG XMDT, BẢO HÀNH 24H','CÓ ZALO THÁNG XMDT, BẢO HÀNH 24H','<p>✅ BẢO HÀNH 24H (KÈM PROXY)</p><p>✅ XMDT TỪ 1 - 12 THÁNG CÓ 5 - 200BB</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724071370257-123557272.jpg',1,'ban-zalo-thang-xmdt-bao-hanh-24h','success',1,0,'2024-08-19 12:42:50.267','2024-08-19 12:48:33.001','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','3',1,3),(10,' BÁN ZALO NEW XMDT','CÓ ZALO NEW XMDT ','<p>ZALO NEW XMDT GỒM :</p><p>✅ XMDT 7 -&gt; 30 NGÀY CÓ TỪ 5 -&gt; 100BB&nbsp;</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724071670816-276150132.jpg',1,'ban-zalo-new-xmdt','success',1,0,'2024-08-19 12:47:50.827','2024-08-19 12:48:33.725','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','3',1,3),(11,'ZALO CỔ XMDT','CÓ ZALO CỔ XMDT CỨNG','<p>ZALO CỖ XMDT GỒM : </p><p>✅ XMDT TỪ 1 - 3 NĂM CÓ 50 - 500BB</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724072056195-862496939.jpg',1,'zalo-co-xmdt','success',1,0,'2024-08-19 12:54:16.209','2024-08-19 13:32:56.019','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','2',1,3),(12,'ZALO NEW NGÂM XMDT - BẢO HÀNH 24H','CÓ ZALO NEW NGĂM XDMT - BH24H','<p>ZALO NEW NGÂM XMDT GỒM : </p><p>✅ BẢO HÀNH 24H (KÈM PROXY)</p><p>✅ NGÂM XMDT TỪ 7 -&gt; 30 NGÀY CÓ 0 -&gt; 100BB&nbsp;</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724072623345-770114204.jpg',1,'zalo-new-ngam-xmdt-bao-hanh-24h','success',1,0,'2024-08-19 13:03:43.360','2024-08-19 13:32:55.258','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','5',1,3),(13,'ZALO THÁNG XMDT','CÓ ZALO THÁNG XMDT','<p>ZALO THÁNG XMDT GỒM : </p><p>✅ XMDT TỪ 1 - 12 THÁNG CÓ TỪ 20 - 500BB</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724073043612-533907862.jpg',1,'zalo-thang-xmdt','success',1,0,'2024-08-19 13:10:43.626','2024-08-19 13:32:53.969','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','4',1,3),(14,'Zalo năm cổ siêu trâu bảo hành 24h > 48','Zalo năm cổ siêu trâu bảo hành 24h','','https://api.taphoazalo.com/api/image/uploads/products/product-1724074261663-411717648.jpg',1,'zalo-nam-co-sieu-trau-bao-hanh-24h-48','success',1,0,'2024-08-19 13:31:01.671','2024-08-19 13:32:52.720','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',1,3),(15,'BÁN ZALO BUSINESS CHẤT LƯỢNG - BẢO HÀNH 24H','CÓ BUSINESS BASIC - BẢO HÀNH 24H','<p>ZALO BUSINESS BASIC GỒM : </p><p>▶️ XMDT &gt;TUẦN CÓ TỪ 10 - 500BB</p><p>▶️ BẢO HÀNH 24H - KÈM PROXY</p><p>✅ĐẢM BẢO HÀNG CHẤT LƯỢNG✅</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724075188654-280401798.jpg',1,'ban-zalo-business-chat-luong-bao-hanh-24h','success',1,0,'2024-08-19 13:46:28.661','2024-08-20 04:58:23.283','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','4',1,3),(16,'ZALO BUSINESS PRO CHẤT LƯỢNG - BẢO HÀNH 24H','CÓ ZALO BUSINESS PRO - BẢO HÀNH 24H','<p>ZALO BUSINESS PRO GỒM :</p><p>▶️ XMDT &gt;TUẦN CÓ TỪ 10 - 500BB</p><p>▶️ BẢO HÀNH 24H - KÈM PROXY</p><p>✅ĐẢM BẢO HÀNG CHẤT LƯỢNG✅</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724075385482-827167885.jpg',1,'zalo-business-pro-chat-luong-bao-hanh-24h','success',1,0,'2024-08-19 13:49:45.489','2024-08-20 04:58:23.753','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','4',1,3),(18,'Ở ĐÂY BÁN ZALO NEW SPAM CHƯA XMDT',' CÓ ZALO NEW SPAM CHƯA XMDT','<p>?MÔ TẢ HÀNG :</p><p>▶️GỒM ZALO NEW SPAM CHƯA&nbsp;XMDT TỪ 7-&gt;30 NGÀY CÓ 0 -&gt; 10BB</p><p>▶️CHỈ BẢO HÀNH LOGIN</p><p>?LƯU Ý :</p><p>- Hàng này nếu mọi người muốn mình quét giúp giữ acc và giữ số - 50k/1 tháng&nbsp;</p><p>- Bàn giao gọn lẹ trung gian người bán người mua&nbsp;</p><p>- Kèm hướng dẫn login hạn chế bay acc&nbsp;</p>','https://api.taphoazalo.com/api/image/uploads/products/product-1724311176782-491114832.jpg',1,'o-day-ban-zalo-new-spam-chua-xmdt','success',1,0,'2024-08-22 07:19:36.795','2024-08-22 12:59:49.195','b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','3',1,3),(20,'Via Cổ Có Tương Tác, Comment, BV Từ 2020 - 2024','Via Cổ Có Tương Tác, Comment, BV Từ 2020 - 2024','<p>Via cổ có tương tác, comment, nhiều bài viết từ 2020 - 2024 cho anh em nào cần</p><p>Có vấn đề gì về acc hãy liên hệ mình </p>','https://api.taphoazalo.com/api/image/uploads/products/product-1725278549722-24514725.jpg',1,'via-co-co-tuong-tac-comment-bv-tu-2020-2024','success',1,0,'2024-09-02 12:02:29.738','2024-09-02 12:14:45.682','fdafa438-e72e-45a6-a943-3e17afd08153','2',1,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `referralCode` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountBalance` int NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nameBank` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profiles_userId_key` (`userId`),
  CONSTRAINT `profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (2,'Tap hoa Trung',NULL,20000000,'90c184ee-3304-45a6-a7c0-07674dd62706',NULL,NULL,NULL,NULL),(3,'phannhatduy888','',0,'9ec5c206-e5d6-45a0-8e45-14c78f39f2c6',NULL,NULL,NULL,NULL),(4,'chhc29058','',0,'d85c27f8-7912-4469-b0c2-ba79d9da6af2',NULL,NULL,NULL,NULL),(5,'namisaidgirl','',0,'811f7a51-8d96-4b9e-ae36-d4a0ac99e2ab',NULL,NULL,NULL,NULL),(6,'trungnguyen','321321321',0,'7de8aac2-b9a8-404a-a4b6-3ce204d21404',NULL,NULL,NULL,NULL),(7,'ADMIN 2 Vip',NULL,20000000,'789b9f3e-4e5d-4451-90fb-6117578f8e47',NULL,NULL,NULL,NULL),(8,'ADMIN 2 Vip',NULL,20000000,'44848200-52af-4c9a-8839-357b68d36ca7',NULL,NULL,NULL,NULL),(9,'Tap hoa Trung',NULL,24107776,'d6837dc2-20e7-4253-a487-635dd910052d',NULL,NULL,NULL,NULL),(10,'Nami Nè',NULL,0,'19fd5c54-c42e-4207-b0cb-268eb4c9174a',NULL,NULL,NULL,NULL),(11,'minhquando690','',0,'de306f21-0f36-467a-9b19-3e4510995a56',NULL,NULL,NULL,NULL),(12,'sddggh27','',0,'67f0811b-459d-4d8b-9337-4ed88cee6f49',NULL,NULL,NULL,NULL),(13,'nguyenhuuloc10102004','',0,'364e0a39-7c88-458e-8749-9ae9e7842b2c',NULL,NULL,NULL,NULL),(14,'Nhật Duy',NULL,0,'6de1596e-52ef-482c-a63f-f7dfc8b7cce2',NULL,NULL,NULL,NULL),(15,'NHAT NHAT',NULL,50000,'51ae7b06-6a06-4ae5-a59b-8d77ea29429c',NULL,NULL,NULL,NULL),(16,'Nguyễn Văn Hiếu',NULL,8242000,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6',NULL,NULL,NULL,NULL),(17,'Nguyễn Văn Hiếu',NULL,141701000,'cb1a195a-d918-4a53-aea8-f6d0735414ab','0812525127','https://www.facebook.com/profile.php?id=61551740007379','MBBANK','0326470006'),(18,'Aday Aday',NULL,0,'526e69b0-d26f-475b-957e-db2ab8e9fb0f',NULL,NULL,NULL,NULL),(19,'Vương Hoàng',NULL,0,'eea0f82a-ed5f-4578-bc34-1fd5e9e20ae9',NULL,NULL,NULL,NULL),(20,'Vương Hồ Hoàng (Wolf)',NULL,0,'5447adf4-225c-4ec5-acee-570c89f434f0','0395251176','vuong','MB','0395251176'),(21,'phát Bùi võ ngọc',NULL,0,'5c5a0ef8-9053-40ab-a4f0-64a36ddc1550',NULL,NULL,NULL,NULL),(22,'ducbao68688-fb3cb','',0,'805d8296-b952-4c39-acbf-242d330bebd2',NULL,NULL,NULL,NULL),(23,'Mhanhbanzalo',NULL,0,'b0239b43-52f7-4ccb-a3dc-ed6fbd796baf',NULL,NULL,NULL,NULL),(24,'Hà Ngân',NULL,0,'7eef50a2-d5d6-4069-a8a0-9ff111bccb6f',NULL,NULL,NULL,NULL),(25,'Mỹ Lệ Phan',NULL,0,'ca3776c7-8db7-4a79-98f1-6136a7976bec',NULL,NULL,NULL,NULL),(26,'levanhoangphuc33988-49dfd','',0,'a742e068-3c95-4b58-aad0-13f26d17333c',NULL,NULL,NULL,NULL),(27,'lto701963-13e60','',0,'ead7b235-aff4-4a86-a377-f1aa6696a465',NULL,NULL,NULL,NULL),(28,'lmpvlogtv1997-3560c','',0,'c5f37fe4-5f8e-4491-a538-37724b7c1bb8',NULL,NULL,NULL,NULL),(29,'003lylia-91679','',0,'300dcf29-c57d-4a7c-b96f-9870fdb71487',NULL,NULL,NULL,NULL),(30,'vuong quan',NULL,0,'ea63d1bd-7159-4c8b-849e-205bdcf71a75',NULL,NULL,NULL,NULL),(31,'HCM dev',NULL,0,'e87ea926-3388-40ab-b46b-3c3f8a8e627a','321321312312','dsadsadsadas','AGRIBANK','0886506127'),(32,'Trung Thành',NULL,0,'35b34aac-d633-4cb3-aa10-c69b1a52e11b','4321312314324','3213edwqdas','AGRIBANK','0886506127'),(33,'Như Lâm',NULL,100000,'74c4935f-6feb-4415-a8ea-e37526b8e54e','8862561395','Ngân Hà','BIDV','0568340092'),(34,'Zalo Tạp hoá',NULL,0,'25129f5a-806a-4e59-96e4-de5e8faa3413',NULL,NULL,NULL,NULL),(35,'Văn Hiếu Nguyễn',NULL,0,'fdafa438-e72e-45a6-a943-3e17afd08153','0812525127','https://www.facebook.com/profile.php?id=61551740007379','NGUYEN VAN HIEU','0326470006'),(36,'duchai13062002-fec4a','',0,'2b42436d-ae9c-4a75-9191-ed1a386184a8',NULL,NULL,NULL,NULL),(37,'ola.langtu-46752','',0,'404f1d65-231f-472f-85f6-6a676ae7f7e7',NULL,NULL,NULL,NULL),(38,'Tran moc',NULL,0,'7ff148e9-a5cd-4090-8f2a-97e5b6acc17c',NULL,NULL,NULL,NULL),(39,'No Mo',NULL,0,'2742d078-74b0-4867-b10d-9b30bae6a9f6',NULL,NULL,NULL,NULL),(40,'minhhoangq91-52f7f','',0,'3a1c9154-48af-45b6-908f-26a8a14536c5',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `serviceOrdersId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_serviceOrdersId_fkey` (`serviceOrdersId`),
  CONSTRAINT `room_serviceOrdersId_fkey` FOREIGN KEY (`serviceOrdersId`) REFERENCES `serviceOrders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('1','NHAT NHAT','2024-08-16 13:31:19.836','2024-08-16 13:31:19.836',NULL),('10','Đơn hàng số 2f6180','2024-08-17 12:28:42.907','2024-08-17 12:28:42.907',NULL),('11','Đơn hàng số 2e8489','2024-08-17 12:34:22.989','2024-08-17 12:34:22.989',NULL),('12','Đơn hàng số 470e4e','2024-08-17 12:47:20.972','2024-08-17 12:47:20.972',NULL),('13','Đơn hàng số f4299c','2024-08-18 04:31:43.159','2024-08-18 04:31:43.159',NULL),('14','Đơn hàng số 390644','2024-08-19 03:15:25.445','2024-08-19 03:15:25.445',NULL),('15','Cuti mhanh','2024-08-19 11:52:23.170','2024-08-19 11:52:23.170',NULL),('16','Đơn hàng số 6220d6','2024-08-19 12:09:58.368','2024-08-19 12:09:58.368',NULL),('17','Đơn hàng số e18dad','2024-08-19 12:12:34.439','2024-08-19 12:12:34.439',NULL),('18','Đơn hàng số e25f59','2024-08-19 12:12:36.270','2024-08-19 12:12:36.270',NULL),('19','Đơn hàng số c6bae8','2024-08-19 12:26:40.418','2024-08-19 12:26:40.418',NULL),('2','Hiếu Nguyễn Văn','2024-08-17 02:59:21.966','2024-08-17 02:59:21.966',NULL),('20','Đơn hàng số 04345a','2024-08-19 12:26:48.645','2024-08-19 12:26:48.645',NULL),('21','Chăm sóc khách hàng','2024-08-19 12:44:06.959','2024-08-19 12:44:06.959',NULL),('22','Nguyễn Văn Hiếu','2024-08-19 12:56:42.096','2024-08-19 12:56:42.096',NULL),('23','Đơn hàng số d3fabe','2024-08-19 13:48:28.371','2024-08-19 13:48:28.371',NULL),('24','Đơn hàng số 0c524a','2024-08-19 13:48:48.461','2024-08-19 13:48:48.461',NULL),('25','Đơn hàng số 068b6e','2024-08-20 04:49:16.733','2024-08-20 04:49:16.733',NULL),('26','Đơn hàng số a96691','2024-08-22 07:29:43.849','2024-08-22 07:29:43.849',NULL),('27','Đơn hàng số dc3356','2024-08-22 07:29:45.885','2024-08-22 07:29:45.885',NULL),('28','Đơn hàng số d4053d','2024-08-22 07:30:00.449','2024-08-22 07:30:00.449',NULL),('29','Mua Bán Zalo','2024-08-22 07:37:38.861','2024-08-22 07:37:38.861',NULL),('3','văn huy','2024-08-17 03:03:02.118','2024-08-17 03:03:02.118',NULL),('30','Nguyễn Văn Hiếu','2024-08-25 07:12:16.338','2024-08-25 07:12:16.338',NULL),('31','vuong quan','2024-08-25 14:01:15.473','2024-08-25 14:01:15.473',NULL),('32','Chăm sóc khách hàng','2024-08-26 13:03:06.087','2024-08-26 13:03:06.087',NULL),('33','Mỹ Lệ Phan','2024-08-27 12:03:24.003','2024-08-27 12:03:24.003',NULL),('34','Đơn hàng số d31759','2024-08-30 06:12:31.699','2024-08-30 06:12:31.699',NULL),('35','Như Lâm','2024-09-02 03:45:08.527','2024-09-02 03:45:08.527',NULL),('36','Nhật Duy','2024-09-02 03:54:54.662','2024-09-02 03:54:54.662',NULL),('37','Ngân Hà','2024-09-02 04:05:05.242','2024-09-02 04:05:05.242',NULL),('38','Đơn hàng số 0f5b83','2024-09-02 12:03:08.599','2024-09-02 12:03:08.599',NULL),('39','Đơn hàng số f152a9','2024-09-02 12:32:00.050','2024-09-02 12:32:00.050',NULL),('4','Aday Aday','2024-08-17 03:39:14.245','2024-08-17 03:39:14.245',NULL),('40','No Mo','2024-09-08 10:33:02.561','2024-09-08 10:33:02.561',NULL),('41','Đơn hàng số 893f88','2024-09-08 11:53:14.064','2024-09-08 11:53:14.064',NULL),('42','Đơn hàng số 30d23a','2024-09-08 11:58:26.303','2024-09-08 11:58:26.303',NULL),('43','Đơn hàng số 5f5d37','2024-09-10 11:53:06.016','2024-09-10 11:53:06.016',NULL),('5','MUA ZALO ','2024-08-17 04:08:15.238','2024-08-17 04:08:15.238',NULL),('53d15679-5ff5-427e-a9d4-f9bdbfb398cb','Đơn hàng số 666026','2024-09-12 03:30:23.660','2024-09-12 03:30:23.660','666026'),('6','Chăm sóc khách hàng','2024-08-17 06:37:22.856','2024-08-17 06:37:22.856',NULL),('7','Đơn hàng số cd927b','2024-08-17 12:21:17.950','2024-08-17 12:21:17.950',NULL),('8','Đơn hàng số d81c94','2024-08-17 12:21:26.930','2024-08-17 12:21:26.930',NULL),('9','Đơn hàng số 941b65','2024-08-17 12:28:11.533','2024-08-17 12:28:11.533',NULL),('98165a4a-76a2-4914-ad6b-42a99307fefe','Vương Hồ Hoàng (Wolf)','2024-09-12 04:44:25.485','2024-09-12 04:44:25.485',NULL),('bfa823dd-8847-40f9-9273-4ec181d68c2e','Đơn hàng số 237157','2024-09-12 03:30:23.378','2024-09-12 03:30:23.378','237157');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomMember`
--

DROP TABLE IF EXISTS `roomMember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomMember` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `joinedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `roomMember_userId_roomId_key` (`userId`,`roomId`),
  KEY `roomMember_roomId_fkey` (`roomId`),
  CONSTRAINT `roomMember_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `roomMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomMember`
--

LOCK TABLES `roomMember` WRITE;
/*!40000 ALTER TABLE `roomMember` DISABLE KEYS */;
INSERT INTO `roomMember` VALUES (1,'51ae7b06-6a06-4ae5-a59b-8d77ea29429c','1','2024-08-16 13:31:19.836'),(2,'90c184ee-3304-45a6-a7c0-07674dd62706','1','2024-08-16 13:31:19.836'),(3,'cb1a195a-d918-4a53-aea8-f6d0735414ab','2','2024-08-17 02:59:21.966'),(4,'90c184ee-3304-45a6-a7c0-07674dd62706','2','2024-08-17 02:59:21.966'),(6,'90c184ee-3304-45a6-a7c0-07674dd62706','3','2024-08-17 03:03:02.118'),(7,'526e69b0-d26f-475b-957e-db2ab8e9fb0f','4','2024-08-17 03:39:14.245'),(8,'90c184ee-3304-45a6-a7c0-07674dd62706','4','2024-08-17 03:39:14.245'),(10,'526e69b0-d26f-475b-957e-db2ab8e9fb0f','5','2024-08-17 04:08:15.238'),(11,'90c184ee-3304-45a6-a7c0-07674dd62706','5','2024-08-17 04:08:15.238'),(12,'d6837dc2-20e7-4253-a487-635dd910052d','6','2024-08-17 06:37:22.856'),(13,'90c184ee-3304-45a6-a7c0-07674dd62706','6','2024-08-17 06:37:22.856'),(30,'b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','15','2024-08-19 11:52:23.170'),(31,'90c184ee-3304-45a6-a7c0-07674dd62706','15','2024-08-19 11:52:23.170'),(33,'7eef50a2-d5d6-4069-a8a0-9ff111bccb6f','16','2024-08-19 12:09:58.368'),(42,'44848200-52af-4c9a-8839-357b68d36ca7','21','2024-08-19 12:44:06.959'),(43,'90c184ee-3304-45a6-a7c0-07674dd62706','21','2024-08-19 12:44:06.959'),(45,'90c184ee-3304-45a6-a7c0-07674dd62706','22','2024-08-19 12:56:42.096'),(60,'90c184ee-3304-45a6-a7c0-07674dd62706','29','2024-08-22 07:37:38.861'),(61,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','30','2024-08-25 07:12:16.338'),(62,'90c184ee-3304-45a6-a7c0-07674dd62706','30','2024-08-25 07:12:16.338'),(63,'ea63d1bd-7159-4c8b-849e-205bdcf71a75','31','2024-08-25 14:01:15.473'),(64,'90c184ee-3304-45a6-a7c0-07674dd62706','31','2024-08-25 14:01:15.473'),(65,'789b9f3e-4e5d-4451-90fb-6117578f8e47','32','2024-08-26 13:03:06.087'),(66,'90c184ee-3304-45a6-a7c0-07674dd62706','32','2024-08-26 13:03:06.087'),(67,'ca3776c7-8db7-4a79-98f1-6136a7976bec','33','2024-08-27 12:03:24.003'),(68,'90c184ee-3304-45a6-a7c0-07674dd62706','33','2024-08-27 12:03:24.003'),(69,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','34','2024-08-30 06:12:31.699'),(71,'74c4935f-6feb-4415-a8ea-e37526b8e54e','35','2024-09-02 03:45:08.527'),(72,'90c184ee-3304-45a6-a7c0-07674dd62706','35','2024-09-02 03:45:08.527'),(73,'6de1596e-52ef-482c-a63f-f7dfc8b7cce2','36','2024-09-02 03:54:54.662'),(74,'90c184ee-3304-45a6-a7c0-07674dd62706','36','2024-09-02 03:54:54.662'),(75,'90c184ee-3304-45a6-a7c0-07674dd62706','37','2024-09-02 04:05:05.242'),(76,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','38','2024-09-02 12:03:08.599'),(78,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','39','2024-09-02 12:32:00.050'),(79,'cb1a195a-d918-4a53-aea8-f6d0735414ab','39','2024-09-02 12:32:00.050'),(80,'2742d078-74b0-4867-b10d-9b30bae6a9f6','40','2024-09-08 10:33:02.561'),(81,'90c184ee-3304-45a6-a7c0-07674dd62706','40','2024-09-08 10:33:02.561'),(82,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','41','2024-09-08 11:53:14.064'),(83,'cb1a195a-d918-4a53-aea8-f6d0735414ab','41','2024-09-08 11:53:14.064'),(84,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','42','2024-09-08 11:58:26.303'),(85,'cb1a195a-d918-4a53-aea8-f6d0735414ab','42','2024-09-08 11:58:26.303'),(86,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','43','2024-09-10 11:53:06.016'),(87,'cb1a195a-d918-4a53-aea8-f6d0735414ab','43','2024-09-10 11:53:06.016'),(88,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','bfa823dd-8847-40f9-9273-4ec181d68c2e','2024-09-12 03:30:23.378'),(89,'cb1a195a-d918-4a53-aea8-f6d0735414ab','bfa823dd-8847-40f9-9273-4ec181d68c2e','2024-09-12 03:30:23.378'),(90,'9f28b4c2-539e-4d6e-9a10-d8710d6190f6','53d15679-5ff5-427e-a9d4-f9bdbfb398cb','2024-09-12 03:30:23.660'),(91,'cb1a195a-d918-4a53-aea8-f6d0735414ab','53d15679-5ff5-427e-a9d4-f9bdbfb398cb','2024-09-12 03:30:23.660'),(92,'5447adf4-225c-4ec5-acee-570c89f434f0','98165a4a-76a2-4914-ad6b-42a99307fefe','2024-09-12 04:44:25.485'),(93,'90c184ee-3304-45a6-a7c0-07674dd62706','98165a4a-76a2-4914-ad6b-42a99307fefe','2024-09-12 04:44:25.485');
/*!40000 ALTER TABLE `roomMember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceCategory`
--

DROP TABLE IF EXISTS `serviceCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryCover` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceCategory`
--

LOCK TABLES `serviceCategory` WRITE;
/*!40000 ALTER TABLE `serviceCategory` DISABLE KEYS */;
INSERT INTO `serviceCategory` VALUES (1,'Tăng tương tác','tang-tuong-tac'),(2,'Dịch vụ phần mềm','dich-vu-phan-mem'),(3,'BlockChain','blockchain'),(4,'Dịch vụ khác','dich-vu-khac');
/*!40000 ALTER TABLE `serviceCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceOrders`
--

DROP TABLE IF EXISTS `serviceOrders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceOrders` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `unitPrice` int NOT NULL,
  `sale` int NOT NULL,
  `total` int NOT NULL,
  `refund` int NOT NULL,
  `confirmSeller` tinyint(1) NOT NULL DEFAULT '0',
  `buyerConfirm` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('create','success','refund','cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'create',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serviceId` int DEFAULT NULL,
  `serviceSaleId` int DEFAULT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `serviceOrders_userId_fkey` (`userId`),
  KEY `serviceOrders_serviceId_fkey` (`serviceId`),
  KEY `serviceOrders_serviceSaleId_fkey` (`serviceSaleId`),
  CONSTRAINT `serviceOrders_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `serviceOrders_serviceSaleId_fkey` FOREIGN KEY (`serviceSaleId`) REFERENCES `serviceSales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `serviceOrders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceOrders`
--

LOCK TABLES `serviceOrders` WRITE;
/*!40000 ALTER TABLE `serviceOrders` DISABLE KEYS */;
INSERT INTO `serviceOrders` VALUES ('04345a',1,100000,0,100000,0,1,0,'create','2024-08-19 12:26:48.559','2024-09-12 04:07:31.713','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,56,NULL),('068b6e',1,100000,0,100000,0,1,0,'success','2024-08-20 04:49:16.632','2024-09-12 04:07:32.206','cb1a195a-d918-4a53-aea8-f6d0735414ab',24,64,NULL),('0c524a',1,100000,0,100000,0,1,0,'success','2024-08-19 13:48:48.369','2024-09-12 04:07:33.816','cb1a195a-d918-4a53-aea8-f6d0735414ab',22,1,NULL),('0f5b83',1,100000,0,100000,0,1,0,'success','2024-09-02 12:03:08.512','2024-09-12 04:07:34.349','cb1a195a-d918-4a53-aea8-f6d0735414ab',21,61,''),('237157',1,100000,0,100000,0,1,0,'success','2024-09-12 03:30:23.156','2024-09-12 04:07:34.880','cb1a195a-d918-4a53-aea8-f6d0735414ab',21,1,''),('2e8489',1,100000,0,100000,0,1,0,'create','2024-08-17 12:34:22.894','2024-09-12 04:07:35.405','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL),('2f6180',1,100000,0,100000,0,1,0,'create','2024-08-17 12:28:42.786','2024-09-12 04:07:35.638','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL),('30d23a',1,100000,0,100000,0,1,0,'success','2024-09-08 11:58:26.223','2024-09-13 08:02:38.527','cb1a195a-d918-4a53-aea8-f6d0735414ab',21,1,''),('390644',1,100000,0,100000,0,1,0,'success','2024-08-19 03:15:25.325','2024-09-13 08:02:39.056','cb1a195a-d918-4a53-aea8-f6d0735414ab',28,1,NULL),('3b01a6',1,100000,0,100000,0,1,0,'create','2024-08-31 03:08:49.206','2024-09-12 04:07:37.137','cb1a195a-d918-4a53-aea8-f6d0735414ab',22,62,''),('470e4e',1,100000,0,100000,0,1,0,'create','2024-08-17 12:47:20.840','2024-09-12 04:07:40.939','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL),('5f5d37',1,100000,0,100000,0,1,0,'create','2024-09-10 11:53:05.924','2024-09-12 04:07:41.098','cb1a195a-d918-4a53-aea8-f6d0735414ab',21,1,''),('6220d6',1,100000,0,100000,0,0,0,'create','2024-08-19 12:09:58.236','2024-08-19 12:09:58.236','7eef50a2-d5d6-4069-a8a0-9ff111bccb6f',NULL,1,NULL),('634aba',1,100000,0,100000,0,1,0,'create','2024-08-31 03:31:26.637','2024-09-12 04:07:41.464','cb1a195a-d918-4a53-aea8-f6d0735414ab',24,1,''),('666026',1,100000,0,100000,0,1,0,'create','2024-09-12 03:30:23.609','2024-09-12 04:07:41.986','cb1a195a-d918-4a53-aea8-f6d0735414ab',21,1,''),('893f88',1,100000,0,100000,0,1,0,'create','2024-09-08 11:53:13.976','2024-09-12 04:07:42.573','cb1a195a-d918-4a53-aea8-f6d0735414ab',22,1,''),('941b65',1,100000,0,100000,0,1,0,'create','2024-08-17 12:28:11.420','2024-09-12 04:07:42.973','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL),('a085f7',1,100000,0,100000,0,1,0,'create','2024-08-31 03:08:29.183','2024-09-12 04:07:44.005','cb1a195a-d918-4a53-aea8-f6d0735414ab',21,61,''),('a96691',1,100000,0,100000,0,1,0,'create','2024-08-22 07:29:43.744','2024-09-12 04:07:45.941','cb1a195a-d918-4a53-aea8-f6d0735414ab',22,1,NULL),('c6bae8',1,100000,0,100000,0,1,0,'create','2024-08-19 12:26:40.310','2024-09-12 04:07:45.036','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,56,NULL),('cd927b',1,100000,0,100000,0,1,0,'create','2024-08-17 12:21:17.820','2024-09-12 04:07:46.578','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL),('d31759',2,200000,0,200000,0,1,0,'create','2024-08-30 06:12:31.623','2024-09-12 04:07:48.664','cb1a195a-d918-4a53-aea8-f6d0735414ab',21,61,NULL),('d3fabe',1,100000,0,100000,0,1,0,'success','2024-08-19 13:48:28.263','2024-09-12 04:08:37.760','cb1a195a-d918-4a53-aea8-f6d0735414ab',22,62,NULL),('d4053d',50,5000000,0,5000000,0,1,0,'success','2024-08-22 07:30:00.337','2024-09-12 04:08:36.749','cb1a195a-d918-4a53-aea8-f6d0735414ab',22,62,NULL),('d81c94',1,100000,0,100000,0,1,0,'create','2024-08-17 12:21:26.807','2024-09-12 04:07:52.121','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL),('dc3356',1,100000,0,100000,0,1,0,'success','2024-08-22 07:29:45.833','2024-09-12 04:17:02.526','cb1a195a-d918-4a53-aea8-f6d0735414ab',22,62,NULL),('e18dad',1,100000,0,100000,0,1,0,'create','2024-08-19 12:12:34.334','2024-09-12 04:17:03.166','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL),('e25f59',1,100000,0,100000,0,1,0,'create','2024-08-19 12:12:36.204','2024-09-12 04:17:03.554','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL),('e5cb1b',1,100000,0,100000,0,1,0,'success','2024-08-31 03:08:36.343','2024-09-12 04:06:45.330','cb1a195a-d918-4a53-aea8-f6d0735414ab',22,62,''),('f152a9',1,100000,0,100000,0,0,0,'success','2024-09-02 12:31:59.957','2024-09-12 04:06:45.044','cb1a195a-d918-4a53-aea8-f6d0735414ab',25,65,''),('f4299c',1,2222,0,2222,0,1,0,'create','2024-08-18 04:31:43.068','2024-08-18 04:41:46.715','cb1a195a-d918-4a53-aea8-f6d0735414ab',NULL,1,NULL);
/*!40000 ALTER TABLE `serviceOrders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceReviews`
--

DROP TABLE IF EXISTS `serviceReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceReviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `serviceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `serviceReviews_userId_fkey` (`userId`),
  KEY `serviceReviews_serviceId_fkey` (`serviceId`),
  CONSTRAINT `serviceReviews_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `serviceReviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceReviews`
--

LOCK TABLES `serviceReviews` WRITE;
/*!40000 ALTER TABLE `serviceReviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `serviceReviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceSales`
--

DROP TABLE IF EXISTS `serviceSales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceSales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `serviceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `serviceSales_serviceId_fkey` (`serviceId`),
  CONSTRAINT `serviceSales_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceSales`
--

LOCK TABLES `serviceSales` WRITE;
/*!40000 ALTER TABLE `serviceSales` DISABLE KEYS */;
INSERT INTO `serviceSales` VALUES (1,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(2,'10 Twitter Impression ( Min 500 )',10,NULL),(3,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(4,'Gói 5 triệu view bkt',40000,NULL),(5,'Gói 1 triệu view tính analytics',19000,NULL),(6,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(7,'10 Twitter Impression ( Min 500 )',10,NULL),(8,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(9,'Gói 5 triệu view bkt',40000,NULL),(10,'Gói 1 triệu view tính analytics',19000,NULL),(11,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(12,'10 Twitter Impression ( Min 500 )',10,NULL),(13,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(14,'Gói 5 triệu view bkt',40000,NULL),(15,'Gói 1 triệu view tính analytics',19000,NULL),(16,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(17,'10 Twitter Impression ( Min 500 )',10,NULL),(18,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(19,'Gói 5 triệu view bkt',40000,NULL),(20,'Gói 1 triệu view tính analytics',19000,NULL),(21,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(22,'10 Twitter Impression ( Min 500 )',10,NULL),(23,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(24,'Gói 5 triệu view bkt',40000,NULL),(25,'Gói 1 triệu view tính analytics',19000,NULL),(26,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(27,'10 Twitter Impression ( Min 500 )',10,NULL),(28,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(29,'Gói 5 triệu view bkt',40000,NULL),(30,'Gói 1 triệu view tính analytics',19000,NULL),(31,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(32,'10 Twitter Impression ( Min 500 )',10,NULL),(33,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(34,'Gói 5 triệu view bkt',40000,NULL),(35,'Gói 1 triệu view tính analytics',19000,NULL),(36,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(37,'10 Twitter Impression ( Min 500 )',10,NULL),(38,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(39,'Gói 5 triệu view bkt',40000,NULL),(40,'Gói 1 triệu view tính analytics',19000,NULL),(41,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(42,'10 Twitter Impression ( Min 500 )',10,NULL),(43,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(44,'Gói 5 triệu view bkt',40000,NULL),(45,'Gói 1 triệu view tính analytics',19000,NULL),(46,'Gói 200 acc 5M Impression | 40k một acc',40000,NULL),(47,'10 Twitter Impression ( Min 500 )',10,NULL),(48,'Gói 5 triệu view bkt và 500 fl bảo hành 3 ngày',150000,NULL),(49,'Gói 5 triệu view bkt',40000,NULL),(50,'Gói 1 triệu view tính analytics',19000,NULL),(51,'phan mem chia se ve cac loai facebook',100,NULL),(52,'d d sd sad dá sa ',2222,12),(53,'Tư duy Target theo độ tuổi',1000000,NULL),(54,'Tut chống basck BM',100000,NULL),(55,'Tút làm page xmdt kích lại via xịt xmdt',100000,NULL),(56,'Tút làm page xmdt kích lại via xịt xmdt',100000,NULL),(57,'Tut chống basck BM',100000,NULL),(58,'Tut kích Nolimit',100000,NULL),(59,'Tut kháng page tỷ lệ về cao',100000,NULL),(60,'Tut Kháng Bm Bắt Xmdt',100000,NULL),(61,'Tut add thẻ trên via tỉ lệ 99% thành công',100000,21),(62,'Tut kháng 792 tỉ lệ về 90%',100000,22),(63,'Khắc phục lỗi khi chấp nhận tk vào BM',100000,23),(64,'Cập nhật cách fix lỗi Facebook mới',100000,24),(65,'Cách kháng hold tiền',100000,25),(66,'Một số thủ thuật add thẻ',100000,26),(67,'Tut kháng Tài Khoản Facebook bị treo vĩnh viễn',100000,27),(68,'Kháng TKQC đang bị treo',100000,28),(69,'12 Lỗi đổ tiền quảng cáo lãng phí mà không ra kết quả',100000,29),(70,'Code xóa QTV ẩn TKQC',100000,30),(71,'dsadsadsa',2222,NULL),(72,'dsads ads a',2222,NULL),(73,'Code xóa Quản Trị Viên ẩn Tài Khoản Quảng Cáo',100000,NULL),(74,'Code check limit, check ngưỡng BM',100000,34),(75,'Tư duy Target theo độ tuổi',100000,35),(76,'Chạy ads trực tiếp trên nisck cá nhân',100000,36),(77,'Tình hình Facebook ads hiện nay',100000,37),(78,'10 nguyên tắc vàng khi viết tiêu đề quảng cáo',100000,38),(79,'Kỹ thuật viết content hấp dẫn mà bạn nên đọc',100000,39),(80,'5 mẹo tuyệt vời giúp giảm đến 90% CPM cho FB',100000,40),(81,'Làm sao khi Facebook ads cắn tiền, chạy chậm',100000,41),(82,'Những câu hỏi newbie hay thắc mắc',100000,42),(83,'Lý do không nên tăng ngân sách quảng cáo vào ban đêm',100000,43),(84,'Cách target vào khách hàng của đối thủ trên Facebook ads',100000,44),(85,'Cách lặp trùng lọc đối tượng khách hàng để tiếp cận khách mới',100000,45),(86,'Một số Ví dụ về target ngành hàng cao cấp',100000,46),(87,'Tại sao sao chép nhiều nhóm quảng cáo Facebook thì giá thầu tăng',100000,47),(88,'Tối ưu chỉ số reach (tiếp cận) và hiển thị',100000,48),(89,'Ngân hàng update phí thanh toán Quảng Cáo từ 1-4%',100000,49),(90,'Target thế nào cho đúng ',100000,50),(91,'Tại sao quảng cáo mess (tin nhắn) rẻ nhưng lại không chốt được đơn',100000,51),(92,'Giai đoạn máy học Facebook và cách giảm CPA , tăng hiệu quả quảng cáo',100000,52),(93,'Tut fix ngưỡng 23k dễ nhất',100000,53),(94,'Code add thẻ tài khoản cá nhân',100000,54),(95,'Code add thẻ tài khoản doanh nghiệp',100000,55),(96,'Cách vô hiệu hóa CMD trên máy tính, chống botnet',100000,56),(97,'Tut add thẻ không hold, không die mới',100000,57),(98,'Tut kháng 792',100000,58),(99,'TUT ADD THẺ 22/9/24',100000,59),(100,'Tut kháng bm die vv + bm treo.',100000,60),(101,'????TUT out khỏi BM khi mình là Quản Trị Viên duy nhất - Không phải xóa BM',100000,61),(102,'TuT 75$ cho Via có TKQC tạo cổ',100000,62),(103,'Cách vô hiệu hóa CMD trên máy tính để giảm thiểu rủi do dính b.otn.et',100000,63),(104,'TUT TẠO TÀI KHOẢN VÔ HẠN TRONG BM MỚI NHÂT',100000,64),(105,'TUT TẠO BM NOLIMIT MỚI',100000,65),(106,'Tut kích BM agency 7 dòng ',100000,66),(107,'Tút fix ngưỡng bị lặp 10-20%',100000,67),(108,'Code check via Xác Minh Danh Tính ẩn tích',100000,68),(109,'Tut FIX ngưỡng 10% mới nhất ',100000,69),(110,'Link kháng 273 có hộp thư tỷ lệ kháng về cực cao ',100000,70),(111,'Code check tích kháng page',100000,71),(112,'TUT hạn chế cp phone ',100000,NULL);
/*!40000 ALTER TABLE `serviceSales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceSubCategory`
--

DROP TABLE IF EXISTS `serviceSubCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceSubCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subCategory` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `serviceSubCategory_categoryId_fkey` (`categoryId`),
  CONSTRAINT `serviceSubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `serviceCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceSubCategory`
--

LOCK TABLES `serviceSubCategory` WRITE;
/*!40000 ALTER TABLE `serviceSubCategory` DISABLE KEYS */;
INSERT INTO `serviceSubCategory` VALUES (1,'Dịch vụ Facebook',1),(2,'Dịch vụ Tiktok',1),(3,'Dịch vụ Google',1),(4,'Dịch vụ Telegram',1),(5,'Dịch vụ Shopee',1),(6,'Dịch vụ Discord',1),(7,'Dịch vụ Twitter',1),(8,'Dịch vụ Youtube',1),(9,'Dịch vụ Zalo',1),(10,'Dịch vụ Instagram',1),(11,'Tương tác khác',1),(12,'Dịch vụ code tool',2),(13,'Dịch vụ đồ họa',2),(14,'Dịch vụ video',2),(15,'Dịch vụ tool khác',2),(16,'Dịch vụ tiền ảo',3),(17,'Dịch vụ NFT',3),(18,'Dịch vụ Coinlist',3),(19,'Blockchain khác',3),(20,'Dịch vụ khác',4);
/*!40000 ALTER TABLE `serviceSubCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceViews`
--

DROP TABLE IF EXISTS `serviceViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceViews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `serviceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `serviceViews_userId_fkey` (`userId`),
  KEY `serviceViews_serviceId_fkey` (`serviceId`),
  CONSTRAINT `serviceViews_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `serviceViews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceViews`
--

LOCK TABLES `serviceViews` WRITE;
/*!40000 ALTER TABLE `serviceViews` DISABLE KEYS */;
/*!40000 ALTER TABLE `serviceViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('cancel','success','ide','error') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ide',
  `reseller` tinyint(1) NOT NULL DEFAULT '0',
  `sponsor` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiving` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `subCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_key` (`slug`),
  KEY `services_userId_fkey` (`userId`),
  KEY `services_categoryId_fkey` (`categoryId`),
  KEY `services_subCategoryId_fkey` (`subCategoryId`),
  CONSTRAINT `services_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `serviceCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `services_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `serviceSubCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `services_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (12,'dsadsa','dsadsadsa','<p>dsadsadsa</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723817349655-500655687.jpg','dsadsa','success',1,0,'2024-08-16 14:09:09.667','2024-09-02 12:18:22.215','d6837dc2-20e7-4253-a487-635dd910052d','0',1,1),(21,'Tut add thẻ trên via tỉ lệ 99% thành công','Tut add thẻ trên via tỉ lệ 99% thành công','<p>Tut add thẻ trên via tỉ lệ 99% thành công</p><p>Chúc anh em thành công</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723877607580-940920011.jpg','tut-add-the-tren-via-ti-le-99-thanh-cong','success',1,0,'2024-08-17 06:53:27.592','2024-08-17 06:56:10.430','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(22,'Tut kháng 792 tỉ lệ về 90%','Tut kháng 792 tỉ lệ về 90%','<p>Tut kháng 792 tỉ lệ về 90%</p><p>Chúc anh em thành công</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723877974835-668952689.jpg','tut-khang-792-ti-le-ve-90','success',1,0,'2024-08-17 06:59:34.842','2024-08-17 07:54:16.804','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(23,'Khắc phục lỗi khi chấp nhận tk vào BM','Khắc phục lỗi khi chấp nhận tk vào BM','<p>Khắc phục lỗi khi chấp nhận tài khoản vào BM cho những anh em đang gặp vấn đề này</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723878360391-829818554.jpg','khac-phuc-loi-khi-chap-nhan-tk-vao-bm','success',1,0,'2024-08-17 07:06:00.398','2024-08-17 07:54:17.618','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(24,'Cập nhật cách fix lỗi FB mới','Cập nhật cách fix lỗi FB mới','<p>Cập nhật cách fix lỗi Facebook mới 24/7</p><p>Chúc anh em thành công</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723878452518-635368212.jpg','cap-nhat-cach-fix-loi-fb-moi','success',1,0,'2024-08-17 07:07:32.530','2024-08-17 07:54:18.074','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(25,'Cách kháng hold tiền','Cách kháng hold tiền','<p>Cách kháng hold tiền Facebook thành công tới 93%</p><p>Chúc anh em thành công</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723878518529-588300929.jpg','cach-khang-hold-tien','success',1,0,'2024-08-17 07:08:38.538','2024-08-17 07:54:18.739','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(26,'Một số thủ thuật add thẻ','Một số thủ thuật add thẻ có 2 dạng','<p>Kỹ Thuật và Thủ Thuật add thẻ mọi loại tiền tệ thẻ tín dụng Facebook</p><p><br></p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723878612160-266282372.jpg','mot-so-thu-thuat-add-the','success',1,0,'2024-08-17 07:10:12.170','2024-08-17 07:54:19.778','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(27,'Tut kháng Tài Khoản Facebook bị treo vĩnh viễn','Tut kháng TK bị treo vĩnh viễn','<p>Đây là Tút về kháng Tài Khoản Facebook của anh em đã bị treo vĩnh viễn, bao về bờ</p><p><br></p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723878723248-771609198.jpg','tut-khang-tai-khoan-facebook-bi-treo-vinh-vien','success',1,0,'2024-08-17 07:12:03.260','2024-08-17 07:54:20.102','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(28,'Kháng Tài Khoản Quảng Cáo Facebook đang bị treo','Kháng TKQC đang bị treo','<p>Tút Kháng Tài Khoản Quảng Cáo Facebook của anh em nào đang bị treok, bao về bờ</p><p>Nếu không về hoàn tiền lên đến 100% tổng giá trị số tiền ban đầu của anh em</p><p>Chúc anh em thành công</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723878842520-843011181.jpg','khang-tai-khoan-quang-cao-facebook-dang-bi-treo','success',1,0,'2024-08-17 07:14:02.528','2024-08-17 07:54:20.771','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(29,'12 Lỗi đổ tiền quảng cáo lãng phí mà không ra kết quả','12 Lỗi đổ tiền quảng cáo lãng phí mà không ra kết quả','<p>Đây là những gì 12 lỗi đổ tiền quảng cáo mà anh em đã lãng phí mà chả ra kết quả hái trái được cái gì, sau đây là những gì 12 lỗi mà anh em cần khắc phục gấp</p><p>Chúc anh em làm việc 1 ngày vui vẻ</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723878943731-376632386.jpg','12-loi-do-tien-quang-cao-lang-phi-ma-khong-ra-ket-qua','success',1,0,'2024-08-17 07:15:43.742','2024-08-17 07:54:21.187','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(30,'Code xóa QTV ẩn TKQC','Code xóa Quản Trị Viên ẩn TKQC','<p>Code xóa Quản Trị Viên ẩn Tải Khoản Quảng Cáo cho những anh em nào cần</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723879174069-381934027.jpg','code-xoa-qtv-an-tkqc','success',1,0,'2024-08-17 07:19:34.080','2024-08-17 07:54:28.155','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',2,12),(34,'Code check limit, check ngưỡng BM Facebook','Code check limit, check ngưỡng BM','<p>Code check limit, check ngưỡng BM Facebook cho những anh em nào cần tới</p><p>Chúc anh em làm việc 1 ngày vui vẻ</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723880272217-361157884.jpg','code-check-limit-check-nguong-bm-facebook','success',1,0,'2024-08-17 07:37:52.230','2024-08-17 07:54:32.981','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',2,12),(35,'Tư duy Target theo độ tuổi','Tư duy Target theo độ tuổi','<p>Tư duy Target theo độ tuổi trong ngành</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723880366035-715547793.jpg','tu-duy-target-theo-do-tuoi','success',1,0,'2024-08-17 07:39:26.043','2024-08-17 07:54:33.533','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(36,'Chạy ads trực tiếp trên nick cá nhân','Chạy ads trực tiếp trên nick cá nhân','<p>Hướng dẫn Chạy ads trực tiếp trên nick cá nhân của anh em</p><p>Chúc anh em làm việc vui vẻ</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723880656023-529419830.jpg','chay-ads-truc-tiep-tren-nick-ca-nhan','success',1,0,'2024-08-17 07:44:16.029','2024-08-17 07:54:33.971','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(37,'Tình hình Facebook ads hiện nay','Tình hình Facebook ads hiện nay','<p>Nội Dung về tình hình Facebook ads hiện nay dành cho những anh em chưa biết</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723880732704-740120000.jpg','tinh-hinh-facebook-ads-hien-nay','success',1,0,'2024-08-17 07:45:32.713','2024-08-17 07:54:34.796','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(38,'10 nguyên tắc vàng khi viết tiêu đề quảng cáo','10 nguyên tắc vàng khi viết tiêu đề quảng cáo','<p>Đây là nội dung 10 nguyên tắc vàng khi viết tiêu đề quảng cáo dành cho anh em nào cần tham khảo và hiểu biết sâu thêm</p><p>Chúc anh em 1 ngày vui vẻ</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723880794544-364198495.jpg','10-nguyen-tac-vang-khi-viet-tieu-de-quang-cao','success',1,0,'2024-08-17 07:46:34.555','2024-08-17 07:54:35.324','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(39,'Kỹ thuật viết content hấp dẫn mà bạn nên tham khảo','Kỹ thuật viết content hấp dẫn mà bạn nên tham khảo','<p>Nội dung về Kỹ thuật viết content hấp dẫn mà bạn nên tham khảo về nó, biết đâu tương lai nào đó bạn sẽ cần tới nó đấy nhé</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723880907786-976961863.jpg','ky-thuat-viet-content-hap-dan-ma-ban-nen-tham-khao','success',1,0,'2024-08-17 07:48:27.797','2024-08-17 07:54:35.998','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(40,'5 mẹo tuyệt vời giúp giảm đến 90% CPM cho FB','5 mẹo tuyệt vời giúp giảm đến 90% CPM cho FB','<p>Nội dung trên là 5 mẹo tuyệt vời giúp giảm đến 90% CPM cho Facebook mà anh em nên tham khảo và tìm hiểu về nó, biết đâu tương lai nào đó bạn sẽ cần tới thì sao ?</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723881015443-854625522.jpg','5-meo-tuyet-voi-giup-giam-den-90-cpm-cho-fb','success',1,0,'2024-08-17 07:50:15.452','2024-08-17 07:54:37.037','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(41,'Làm sao khi Facebook ads cắn tiền, chạy chậm','Khi Facebook ads cắn tiền, chạy chậm thì mình phải làm sao ?','<p>Anh em chạy Facebook ads mà bị cắn tiền, chạy chậm ..vv thì anh em nên tham khảo nó để biết cách khác phục kịp thời</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723881104836-535555680.jpg','lam-sao-khi-facebook-ads-can-tien-chay-cham','success',1,0,'2024-08-17 07:51:44.844','2024-08-17 07:54:37.642','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(42,'Những câu hỏi mà người mới hay thắc mắc','Những câu hỏi newbie hay thắc mắc','<p>Những câu hỏi mà newbie vào nghề sẽ hay thắc mắc những nội dung trên</p><p>Chúc anh em làm việc vui vẻ</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723881190765-916715112.jpg','nhung-cau-hoi-ma-nguoi-moi-hay-thac-mac','success',1,0,'2024-08-17 07:53:10.774','2024-08-17 07:54:38.172','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(43,'Lý do không nên tăng ngân sách quảng cáo vào ban đêm','Lý do không nên tăng ngân sách quảng cáo vào ban đêm','<p>Trên đây là những lý do không nên tăng ngân sách quảng vào ban đêm, là những lý do bạn nên biết để biết thời điểm nào nên và không nên</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723881417572-601551292.jpg','ly-do-khong-nen-tang-ngan-sach-quang-cao-vao-ban-dem','success',1,0,'2024-08-17 07:56:57.583','2024-08-17 08:26:49.672','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(44,'Cách target vào khách hàng của đối thủ trên Facebook ads','Cách target vào khách hàng của đối thủ trên FB ads','<p>Nên học hỏi và tìm tòi khách hàng sẽ tự đến với mình, là những kinh nghiệm và kiến thức đã trải qua </p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723881528676-448850633.jpg','cach-target-vao-khach-hang-cua-doi-thu-tren-facebook-ads','success',1,0,'2024-08-17 07:58:48.685','2024-08-17 08:26:50.265','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(45,'Cách lặp trùng lọc đối tượng khách hàng để tiếp cận khách mới','Lặp trùng lọc đối tượng khách hàng để tiếp cận khách mới','','https://api.taphoazalo.com/api/image/uploads/services/service-1723881607814-636184131.jpg','cach-lap-trung-loc-doi-tuong-khach-hang-de-tiep-can-khach-moi','success',1,0,'2024-08-17 08:00:07.822','2024-08-17 08:26:51.040','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(46,'Một số Ví dụ về target ngành hàng cao cấp','Một số Ví dụ về target ngành hàng cao cấp','<p>Các bạn nên tham khảo về ngành hàng cao cấp để tìm hiểu chuyên sâu tối đa</p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723881803786-663675603.jpg','mot-so-vi-du-ve-target-nganh-hang-cao-cap','success',1,0,'2024-08-17 08:03:23.795','2024-08-17 08:26:52.099','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(47,'Tại sao sao chép nhiều nhóm quảng cáo Facebook thì giá thầu tăng','Tại sao sao chép nhiều nhóm quảng cáo fb thì giá thầu tăng','<p><br></p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723881856986-74215663.jpg','tai-sao-sao-chep-nhieu-nhom-quang-cao-facebook-thi-gia-thau-tang','success',1,0,'2024-08-17 08:04:16.996','2024-08-17 08:26:52.623','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(48,'Cách để Tối ưu chỉ số reach (tiếp cận) và hiển thị','Tối ưu chỉ số reach (tiếp cận) và hiển thị','<p>Tiếp cận: Là số người nhìn thấy quảng cáo của bạn</p><p><br></p><p>Hiển thị: Số lần quảng cáo của bạn được người dùng nhìn thấy</p><p><br></p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723881924301-30458419.jpg','cach-de-toi-uu-chi-so-reach-tiep-can-va-hien-thi','success',1,0,'2024-08-17 08:05:24.310','2024-08-17 08:26:53.147','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(49,'Ngân hàng update phí thanh toán Quảng Cáo từ 1-4%','Ngân hàng update phí Thanh Toán Quảng Cáo từ 1-4% như thế nào','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882004976-651567424.jpg','ngan-hang-update-phi-thanh-toan-quang-cao-tu-1-4','success',1,0,'2024-08-17 08:06:44.985','2024-08-17 08:26:53.850','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(50,'Target thế nào cho đúng ?','Target thế nào cho đúng','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882085788-205942512.jpg','target-the-nao-cho-dung','success',1,0,'2024-08-17 08:08:05.798','2024-08-17 08:26:54.924','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(51,'Tại sao quảng cáo mess (tin nhắn) rẻ nhưng lại không chốt được đơn','Tại sao quảng cáo mess (tin nhắn) rẻ nhưng lại không chốt được đơn','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882318682-705143293.jpg','tai-sao-quang-cao-mess-tin-nhan-re-nhung-lai-khong-chot-duoc-don','success',1,0,'2024-08-17 08:11:58.690','2024-08-17 08:26:55.355','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(52,'Giai đoạn máy học Facebook và cách giảm CPA , tăng hiệu quả quảng cáo','Giai đoạn máy học FB và cách giảm CPA , tăng hiệu quả quảng cáo','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882363022-827387134.jpg','giai-doan-may-hoc-facebook-va-cach-giam-cpa-tang-hieu-qua-quang-cao','success',1,0,'2024-08-17 08:12:43.029','2024-08-17 08:26:55.852','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(53,'Tut fix ngưỡng 23k dễ nhất','Tut fix ngưỡng 23k dễ nhất','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882388826-508284199.jpg','tut-fix-nguong-23k-de-nhat','success',1,0,'2024-08-17 08:13:08.836','2024-08-17 08:26:56.539','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(54,'Code add thẻ tài khoản cá nhân','Code add thẻ tài khoản cá nhân','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882438749-520727972.jpg','code-add-the-tai-khoan-ca-nhan','success',1,0,'2024-08-17 08:13:58.756','2024-08-17 08:26:57.472','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',2,12),(55,'Code add thẻ tài khoản doanh nghiệp','code add thẻ tài khoản doanh nghiệp','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882474278-671795091.jpg','code-add-the-tai-khoan-doanh-nghiep','success',1,0,'2024-08-17 08:14:34.284','2024-08-17 08:27:00.500','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',2,12),(56,'Cách vô hiệu hóa CMD trên máy tính, chống botnet','Cách vô hiệu hóa CMD trên máy tính để giảm thiểu rủi do dính b.otn.et ','<p><br></p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723882534522-615528905.jpg','cach-vo-hieu-hoa-cmd-tren-may-tinh-chong-botnet','success',1,0,'2024-08-17 08:15:34.533','2024-08-17 08:27:00.975','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','3',4,20),(57,'Tut add thẻ không hold, không die mới','Tut add thẻ k hold, k die mới','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882574032-790413378.jpg','tut-add-the-khong-hold-khong-die-moi','success',1,0,'2024-08-17 08:16:14.040','2024-08-17 08:27:01.444','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(58,'Tut kháng 792','Tut kháng 792','<p><br></p>','https://api.taphoazalo.com/api/image/uploads/services/service-1723882672480-736957898.jpg','tut-khang-792','success',1,0,'2024-08-17 08:17:52.527','2024-08-17 08:27:01.874','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(59,'TUT ADD THẺ 22/9/24','Tut add thẻ đang ngon 22/6/2024 anh em tham khảo nhé','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882738192-612212767.jpg','tut-add-the-22-9-24','success',1,0,'2024-08-17 08:18:58.239','2024-08-17 08:27:02.712','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(60,'Tut kháng bm die vv + bm treo.','Tut kháng bm die vv + bm treo.','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882770753-91262605.jpg','tut-khang-bm-die-vv-bm-treo','success',1,0,'2024-08-17 08:19:30.800','2024-08-17 08:27:03.250','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(61,'????TUT out khỏi BM khi mình là Quản Trị Viên duy nhất - Không phải xóa BM','????TUT out khỏi BM khi mình là QTV duy nhất - Không phải xóa BM','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882856138-700898912.jpg','tut-out-khoi-bm-khi-minh-la-quan-tri-vien-duy-nhat-khong-phai-xoa-bm','success',1,0,'2024-08-17 08:20:56.146','2024-08-17 08:27:03.801','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(62,'TuT 75$ cho Via có TKQC tạo cổ','TuT 75$ cho Via có TKQC tạo cổ','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882883102-32634219.jpg','tut-75-cho-via-co-tkqc-tao-co','success',1,0,'2024-08-17 08:21:23.109','2024-08-17 08:27:05.609','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(63,'Cách vô hiệu hóa CMD trên máy tính để giảm thiểu rủi do dính b.otn.et','Cách vô hiệu hóa CMD trên máy tính để giảm thiểu rủi do dính b.otn.et','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882929780-17064422.jpg','cach-vo-hieu-hoa-cmd-tren-may-tinh-de-giam-thieu-rui-do-dinh-botnet','success',1,0,'2024-08-17 08:22:09.787','2024-08-17 08:27:05.938','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(64,'TUT TẠO TÀI KHOẢN VÔ HẠN TRONG BM MỚI NHÂT','TUT TẠO TÀI KHOẢN VÔ HẠN TRONG BM MỚI NHÂT','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882958854-732692804.jpg','tut-tao-tai-khoan-vo-han-trong-bm-moi-nhat','success',1,0,'2024-08-17 08:22:38.861','2024-08-17 08:27:06.647','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(65,'TUT TẠO BM NOLIMIT MỚI','TUT TẠO BM NOLIMIT MỚI','','https://api.taphoazalo.com/api/image/uploads/services/service-1723882985410-93906600.jpg','tut-tao-bm-nolimit-moi','success',1,0,'2024-08-17 08:23:05.457','2024-08-17 08:27:07.266','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(66,'Tut kích BM agency 7 dòng ','Tut kích BM agency 7 dòng ','','https://api.taphoazalo.com/api/image/uploads/services/service-1723883012753-894989762.jpg','tut-kich-bm-agency-7-dong','success',1,0,'2024-08-17 08:23:32.759','2024-08-17 08:27:07.770','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(67,'Tút fix ngưỡng bị lặp 10-20%','Tút fix ngưỡng bị lặp 10-20%','','https://api.taphoazalo.com/api/image/uploads/services/service-1723883040524-305724824.jpg','tut-fix-nguong-bi-lap-10-20','success',1,0,'2024-08-17 08:24:00.534','2024-08-17 08:27:08.527','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(68,'Code check via Xác Minh Danh Tính ẩn tích','code check via xmdt ẩn tích','','https://api.taphoazalo.com/api/image/uploads/services/service-1723883083258-321817276.jpg','code-check-via-xac-minh-danh-tinh-an-tich','success',1,0,'2024-08-17 08:24:43.263','2024-08-17 08:27:10.241','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(69,'Tut FIX ngưỡng 10% mới nhất ','Tut FIX ngưỡng 10% mới nhất ','','https://api.taphoazalo.com/api/image/uploads/services/service-1723883118573-301474251.jpg','tut-fix-nguong-10-moi-nhat','success',1,0,'2024-08-17 08:25:18.622','2024-08-17 08:27:10.800','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(70,'Link kháng 273 có hộp thư tỷ lệ kháng về cực cao ','Link kháng 273 có hộp thư tỷ lệ kháng về cực cao ','','https://api.taphoazalo.com/api/image/uploads/services/service-1723883148463-586239879.jpg','link-khang-273-co-hop-thu-ty-le-khang-ve-cuc-cao','success',1,0,'2024-08-17 08:25:48.470','2024-08-17 08:27:11.082','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20),(71,'Code check tích kháng page','Code check tích kháng page','','https://api.taphoazalo.com/api/image/uploads/services/service-1723883174950-392582267.jpg','code-check-tich-khang-page','success',1,0,'2024-08-17 08:26:14.958','2024-08-17 08:27:11.722','9f28b4c2-539e-4d6e-9a10-d8710d6190f6','2',4,20);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `emailVerificationToken` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerificationTokenExpiresAt` datetime(3) DEFAULT NULL,
  `qrCode` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idBank` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('USER','CUSTOMER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  UNIQUE KEY `users_username_key` (`username`),
  UNIQUE KEY `users_idBank_key` (`idBank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('19fd5c54-c42e-4207-b0cb-268eb4c9174a','namisadgirl19@gmail.com','namisadgirl19',NULL,1,NULL,NULL,NULL,NULL,'USER','2024-07-29 04:40:59.319','2024-07-29 04:40:59.319'),('25129f5a-806a-4e59-96e4-de5e8faa3413','shoptaphoazalo@gmail.com','shoptaphoazalo',NULL,1,NULL,NULL,NULL,NULL,'USER','2024-09-02 03:53:33.355','2024-09-02 03:53:33.355'),('2742d078-74b0-4867-b10d-9b30bae6a9f6','mono24309@gmail.com','mono24309',NULL,1,NULL,NULL,'pay_6fb8a737-1726233853245.jpg','6fb8a737','USER','2024-09-08 10:14:46.333','2024-09-13 13:24:13.262'),('2b42436d-ae9c-4a75-9191-ed1a386184a8','duchai13062002@gmail.com','duchai13062002-fec4a','$2b$10$J7D.gN80VBWna11B69TIHuwtEnWmEwQ0qyKZ3KaEmwil4dE0QROaG',1,NULL,NULL,NULL,NULL,'USER','2024-09-05 09:47:29.349','2024-09-05 09:48:06.441'),('300dcf29-c57d-4a7c-b96f-9870fdb71487','003lylia@gmail.com','003lylia-91679','$2b$10$z5ICeaSQU1yzolncXc7fZ.SaCZ4p0xJL4N/XBhMD8mfaDQcFv4dfG',1,NULL,NULL,NULL,NULL,'USER','2024-08-25 00:50:22.352','2024-08-25 00:56:58.274'),('35b34aac-d633-4cb3-aa10-c69b1a52e11b','trungpyy@gmail.com','trungpyy',NULL,1,NULL,NULL,NULL,NULL,'CUSTOMER','2024-08-31 08:27:21.679','2024-08-31 08:30:16.439'),('364e0a39-7c88-458e-8749-9ae9e7842b2c','nguyenhuuloc10102004@gmail.com','nguyenhuuloc10102004','$2b$10$EXLMTVobbpV8GItBvJh7ye8hY5A5XSJiIU/44P59MyuFJGVMt4CEa',1,NULL,NULL,NULL,NULL,'USER','2024-08-01 05:45:06.777','2024-08-01 05:46:00.435'),('3a1c9154-48af-45b6-908f-26a8a14536c5','minhhoangq91@gmail.com','minhhoangq91-52f7f','$2b$10$c4fL4xpiGV3ufAtREnw.dOMt4Qk.s4rn2IA.MFnbMyM6s7sMJxxOO',0,'b936688cd8ecaa09bc0f65ee8490ee7a329dc5adf9b99c977da93c76d8859566','2024-09-12 07:36:32.392','pay_763e863f-1726089948210.jpg','763e863f','USER','2024-09-11 21:25:47.877','2024-09-12 06:36:32.393'),('404f1d65-231f-472f-85f6-6a676ae7f7e7','ola.langtu@gmail.com','ola.langtu-46752','$2b$10$wBgZfwFh7ThdtOnc1gwOMOJlKn/dIEmAVMwuTYqhWTJRdP9XFW1Ay',1,NULL,NULL,NULL,NULL,'USER','2024-09-07 07:14:14.926','2024-09-07 07:19:08.619'),('44848200-52af-4c9a-8839-357b68d36ca7','user2024@gmail.com','user2024','$2b$10$Fu2EfzwncyTohzO6It29IOJHqZmRKMrRjP.QLiTzFTYwzUWcsWfCG',1,NULL,NULL,NULL,NULL,'USER','2024-07-28 17:58:27.899','2024-07-31 06:22:20.422'),('51ae7b06-6a06-4ae5-a59b-8d77ea29429c','nhatlong888889@gmail.com','nhatlong888889',NULL,1,NULL,NULL,NULL,NULL,'CUSTOMER','2024-08-16 13:13:26.309','2024-09-06 13:42:42.723'),('526e69b0-d26f-475b-957e-db2ab8e9fb0f','adayaday912@gmail.com','adayaday912',NULL,1,NULL,NULL,NULL,NULL,'CUSTOMER','2024-08-17 03:39:11.043','2024-08-17 11:39:56.577'),('5447adf4-225c-4ec5-acee-570c89f434f0','vuongho098@gmail.com','vuongho098',NULL,1,NULL,NULL,'pay_18db5b50-1726116117153.jpg','18db5b50','CUSTOMER','2024-08-17 08:12:27.232','2024-09-12 04:42:36.967'),('5c5a0ef8-9053-40ab-a4f0-64a36ddc1550','buivongocphat2019@gmail.com','buivongocphat2019',NULL,1,NULL,NULL,NULL,NULL,'USER','2024-08-17 11:42:28.718','2024-08-17 11:44:59.219'),('67f0811b-459d-4d8b-9337-4ed88cee6f49','sddggh27@gmail.com','sddggh27','$2b$10$BgpVsZKnc8EXYUT1Rt7uDe5rlcPcuiM.eNYni/S0brm0dbIgJ4mFO',1,NULL,NULL,NULL,NULL,'USER','2024-08-01 01:12:45.565','2024-08-01 01:13:02.184'),('6de1596e-52ef-482c-a63f-f7dfc8b7cce2','phannhatduy778@gmail.com','phannhatduy778',NULL,1,NULL,NULL,NULL,NULL,'USER','2024-08-16 13:12:40.022','2024-08-16 13:23:01.535'),('74c4935f-6feb-4415-a8ea-e37526b8e54e','lamnhuhihi@gmail.com','lamnhuhihi',NULL,1,NULL,NULL,'pay_bc25ec8b-1726114527952.jpg','bc25ec8b','CUSTOMER','2024-09-02 02:48:25.264','2024-09-12 04:15:27.970'),('789b9f3e-4e5d-4451-90fb-6117578f8e47','customer@gmail.com','customer','$2b$10$nC61jLt.kC3/04iAoRDFgOy7YY3As9gBmwdHyKpff9S2vvKaR/PMC',1,NULL,NULL,'pay_8fc77f98-1726037777245.jpg','8fc77f98','CUSTOMER','2024-07-28 17:58:27.896','2024-09-11 06:56:17.262'),('7de8aac2-b9a8-404a-a4b6-3ce204d21404','trungnguyen@gmail.com','trungnguyen','$2b$10$cbiV8Sv1Lz7vQ5kYCPrnxOdD9dxDz0CDjgbgQHgCMJZAvTlZzVG4G',1,NULL,NULL,NULL,NULL,'USER','2024-07-28 17:58:27.892','2024-07-28 17:58:27.892'),('7eef50a2-d5d6-4069-a8a0-9ff111bccb6f','nganhaiuuuu@gmail.com','nganhaiuuuu',NULL,1,NULL,NULL,'pay_a4965a91-1726058666620.jpg','a4965a91','CUSTOMER','2024-08-19 12:05:38.395','2024-09-11 12:44:26.633'),('7ff148e9-a5cd-4090-8f2a-97e5b6acc17c','moctran669@gmail.com','moctran669',NULL,1,NULL,NULL,NULL,NULL,'USER','2024-09-07 12:24:12.945','2024-09-07 12:24:12.945'),('805d8296-b952-4c39-acbf-242d330bebd2','ducbao68688@gmail.com','ducbao68688-fb3cb','$2b$10$3xCd.q2IA.OI6tN4Fj.VkuNq16CCqWCjEL4ddhu4J5VcI2p7Vy9Dq',1,NULL,NULL,NULL,NULL,'USER','2024-08-18 09:47:41.339','2024-08-18 09:55:09.947'),('811f7a51-8d96-4b9e-ae36-d4a0ac99e2ab','namisaidgirl@gmail.com','namisaidgirl','$2b$10$Lsewk0hejVLeZnGabobQieKf.qk4smRkFb8FDVKBV82QIwXVqRo0e',1,NULL,NULL,NULL,NULL,'USER','2024-07-28 17:58:27.888','2024-07-29 04:40:40.692'),('90c184ee-3304-45a6-a7c0-07674dd62706','admin1@gmail.com','admin1','$2b$10$t0mDFS8rW6Npz0Xh.KMR1u9Fl7/aUaCbMrmi9jH6kcHqQgSxgzXvi',1,NULL,NULL,NULL,NULL,'ADMIN','2024-07-28 17:58:27.870','2024-09-06 13:42:08.795'),('9ec5c206-e5d6-45a0-8e45-14c78f39f2c6','phannhatduy888@gmail.com','phannhatduy888','$2b$10$goqF5hKcmsWpKBBcA7.Vh.i1a3.teVPKEgxUSWNE.k40PHA4CWjAy',1,NULL,NULL,NULL,NULL,'ADMIN','2024-07-28 17:58:27.875','2024-07-28 17:58:27.875'),('9f28b4c2-539e-4d6e-9a10-d8710d6190f6','nhincaiconcac302@gmail.com','nhincaiconcac302',NULL,1,NULL,NULL,'pay_f1f197d8-1726113863478.jpg','f1f197d8','CUSTOMER','2024-08-16 13:49:03.157','2024-09-12 04:04:23.496'),('a742e068-3c95-4b58-aad0-13f26d17333c','levanhoangphuc33988@gmail.com','levanhoangphuc33988-49dfd','$2b$10$FwCAHzBxe.THhzk0.Nhrs.N2n2zqFriTqGRSWxUPsEm7U/7IksFa2',0,'135c6aa5eaee816d4926fbfe0c10f3cdd7da39bfeb24526544455d55b7c6bdb9','2024-08-23 17:22:53.231',NULL,NULL,'USER','2024-08-23 16:22:53.304','2024-08-23 16:22:53.673'),('b0239b43-52f7-4ccb-a3dc-ed6fbd796baf','mhanhcuti00@gmail.com','mhanhcuti00',NULL,1,NULL,NULL,NULL,NULL,'CUSTOMER','2024-08-19 11:51:51.483','2024-08-19 11:52:46.495'),('c5f37fe4-5f8e-4491-a538-37724b7c1bb8','lmpvlogtv1997@gmail.com','lmpvlogtv1997-3560c','$2b$10$DSCgeEHfN1kuSdSXcvd3V./SvfvamMEt.TBj7sdlBUROgNiUt56zS',1,NULL,NULL,NULL,NULL,'USER','2024-08-24 18:56:16.497','2024-08-24 19:00:45.774'),('ca3776c7-8db7-4a79-98f1-6136a7976bec','phanmyle338@gmail.com','phanmyle338',NULL,1,NULL,NULL,NULL,NULL,'USER','2024-08-22 02:53:06.762','2024-08-22 02:53:06.762'),('cb1a195a-d918-4a53-aea8-f6d0735414ab','hieulapro0@gmail.com','hieulapro0',NULL,1,NULL,NULL,'pay_709df029-1726115792484.jpg','709df029','CUSTOMER','2024-08-17 02:58:31.961','2024-09-12 04:36:32.500'),('d6837dc2-20e7-4253-a487-635dd910052d','admin@gmail.com','admin','$2b$10$MWudg/OZCTGxWkzEwbWrh.rFmWhdIIQwBoE32Q5.v6dKKki6OPWda',1,NULL,NULL,NULL,NULL,'ADMIN','2024-07-30 09:52:41.314','2024-07-30 09:52:41.314'),('d85c27f8-7912-4469-b0c2-ba79d9da6af2','chhc29058@gmail.com','chhc29058','$2b$10$Frs85sHZXm7hRXbi.ZfrquNQEX3FLH5qS4kR2t3n3h71XUsZGC.0q',1,NULL,NULL,NULL,NULL,'USER','2024-07-28 17:58:27.879','2024-07-31 08:12:22.206'),('de306f21-0f36-467a-9b19-3e4510995a56','minhquando690@gmail.com','minhquando690','$2b$10$oQbbIGBpw0BIVr65PZUi4OSqJcramYXUfqSaVYnDayj8tjROdLEby',1,NULL,NULL,NULL,NULL,'USER','2024-07-31 15:57:43.783','2024-07-31 16:08:04.180'),('e87ea926-3388-40ab-b46b-3c3f8a8e627a','hcmdev2024@gmail.com','hcmdev2024',NULL,1,NULL,NULL,NULL,NULL,'CUSTOMER','2024-08-30 17:54:44.065','2024-08-31 07:22:47.634'),('ea63d1bd-7159-4c8b-849e-205bdcf71a75','vuongquan1134@gmail.com','vuongquan1134',NULL,1,NULL,NULL,NULL,NULL,'USER','2024-08-25 13:58:46.286','2024-08-25 13:58:46.286'),('ead7b235-aff4-4a86-a377-f1aa6696a465','lto701963@gmail.com','lto701963-13e60','$2b$10$oLepbF3eO4kqmFxDkN7kxeupsi53pWqBIpEiYdOCGhxkD8r.ObRi.',0,'4fdeea3dc4b81b3195c30f78064d92452b0c67e4178fcece41e24ece78070e9a','2024-08-23 17:24:20.250',NULL,NULL,'USER','2024-08-23 16:24:20.325','2024-08-23 16:24:20.598'),('eea0f82a-ed5f-4578-bc34-1fd5e9e20ae9','hohoangvuongpy@gmail.com','hohoangvuongpy',NULL,1,NULL,NULL,NULL,NULL,'USER','2024-08-17 06:37:59.418','2024-08-17 06:38:08.839'),('fdafa438-e72e-45a6-a943-3e17afd08153','thichccakhia@gmail.com','thichccakhia',NULL,1,NULL,NULL,NULL,NULL,'CUSTOMER','2024-09-02 11:58:10.806','2024-09-02 11:58:55.500');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdraws`
--

DROP TABLE IF EXISTS `withdraws`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdraws` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int NOT NULL,
  `banking` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountBank` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('success','cancel','ide','error') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ide',
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `withdraws_userId_fkey` (`userId`),
  CONSTRAINT `withdraws_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdraws`
--

LOCK TABLES `withdraws` WRITE;
/*!40000 ALTER TABLE `withdraws` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdraws` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-13 22:23:42
