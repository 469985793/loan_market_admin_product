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

 Date: 08/18/2017 09:53:14 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `loan_list`
-- ----------------------------
DROP TABLE IF EXISTS `loan_list`;
CREATE TABLE `loan_list` (
  `name` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `money` varchar(255) DEFAULT NULL,
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `type` int(10) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `beforetype` int(10) DEFAULT NULL,
  `toggle` int(2) NOT NULL DEFAULT '1',
  `queue` int(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
