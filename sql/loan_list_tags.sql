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

 Date: 08/18/2017 09:53:32 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `loan_list_tags`
-- ----------------------------
DROP TABLE IF EXISTS `loan_list_tags`;
CREATE TABLE `loan_list_tags` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `loan_list_tags`
-- ----------------------------
BEGIN;
INSERT INTO `loan_list_tags` VALUES ('1', '运营商'), ('2', '通过高'), ('3', '活动中'), ('4', '利息低');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
