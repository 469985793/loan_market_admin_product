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

 Date: 08/18/2017 09:52:58 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `loan_list_admin`
-- ----------------------------
DROP TABLE IF EXISTS `loan_list_admin`;
CREATE TABLE `loan_list_admin` (
  `admin` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  PRIMARY KEY (`admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `loan_list_admin`
-- ----------------------------
BEGIN;
INSERT INTO `loan_list_admin` VALUES ('admin', '21232f297a57a5a743894a0e4a801fc3', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
