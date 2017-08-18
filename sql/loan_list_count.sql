/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : loan

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 08/18/2017 09:53:24 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `loan_list_count`
-- ----------------------------
DROP TABLE IF EXISTS `loan_list_count`;
CREATE TABLE `loan_list_count` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `listId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
