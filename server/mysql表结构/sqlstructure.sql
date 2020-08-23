/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.7.29 : Database - blog
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `blog`;

/*Table structure for table `access_message` */

DROP TABLE IF EXISTS `access_message`;

CREATE TABLE `access_message` (
  `username` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `article_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Imgsrc` mediumtext COLLATE utf8mb4_unicode_ci,
  `value` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `username` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `article_categroy` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `article_brief` text COLLATE utf8mb4_unicode_ci,
  `article_img` text COLLATE utf8mb4_unicode_ci,
  `accessPulish_count` bigint(20) DEFAULT '0',
  `visited` bigint(20) NOT NULL DEFAULT '0',
  `like_Star` bigint(20) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lable` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` date DEFAULT NULL,
  `article_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `demos` */

DROP TABLE IF EXISTS `demos`;

CREATE TABLE `demos` (
  `video_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `video_pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `datetime` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Table structure for table `detail_reply` */

DROP TABLE IF EXISTS `detail_reply`;

CREATE TABLE `detail_reply` (
  `reply_username` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reply_date` timestamp NULL DEFAULT NULL,
  `article_type` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_imgsrc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `datetime` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reply_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `leaveM_reply` */

DROP TABLE IF EXISTS `leaveM_reply`;

CREATE TABLE `leaveM_reply` (
  `reply_username` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reply_date` timestamp NULL DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_imgsrc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `datetime` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reply_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `leave_message` */

DROP TABLE IF EXISTS `leave_message`;

CREATE TABLE `leave_message` (
  `username` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Imgsrc` mediumtext COLLATE utf8mb4_unicode_ci,
  `value` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `index` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `music` */

DROP TABLE IF EXISTS `music`;

CREATE TABLE `music` (
  `music_id` bigint(20) NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`music_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

/*Table structure for table `talk` */

DROP TABLE IF EXISTS `talk`;

CREATE TABLE `talk` (
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `imgsrc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `datetime` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `name` varchar(10) DEFAULT NULL,
  `username` varchar(11) NOT NULL,
  `password` varchar(16) NOT NULL,
  `email` text NOT NULL,
  `info` varchar(255) NOT NULL DEFAULT '这里还是空的，写一些你的介绍吧~',
  `uploadimg` varchar(100) NOT NULL DEFAULT 'http://cdn.mydearest.cn/blog/images/share.jpg',
  `registerTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Trigger structure for table `access_message` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `delete_reply_message` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'%' */ /*!50003 TRIGGER `delete_reply_message` AFTER DELETE ON `access_message` FOR EACH ROW BEGIN
delete from detail_reply where reply_username=old.username and reply_date = old.date; -- old表示tab1表中刚被删除的记录
END */$$


DELIMITER ;

/* Trigger structure for table `leave_message` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `delete_leavemessage_reply` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'%' */ /*!50003 TRIGGER `delete_leavemessage_reply` AFTER DELETE ON `leave_message` FOR EACH ROW BEGIN
delete from leaveM_reply where reply_username=old.username and reply_date=old.date;
END */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
