SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `code_template` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `code_template` ;

-- -----------------------------------------------------
-- Table `code_template`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`user`;
CREATE TABLE IF NOT EXISTS `code_template`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) UNIQUE NOT NULL,
  `user_number` VARCHAR(45) NOT NULL COMMENT '用户编号',
  `nickname` VARCHAR(45) NOT NULL COMMENT '昵称',
  `password` VARCHAR(100) NOT NULL COMMENT '密码',
  `sex` ENUM('male', 'female') NOT NULL DEFAULT 'male' COMMENT '性别',
  `birthday` DATETIME DEFAULT NULL COMMENT '生日',
  `phone` VARCHAR(45) DEFAULT '' COMMENT '电话',
  `email` VARCHAR(45) DEFAULT '' COMMENT '邮箱',
  `address` VARCHAR(45) DEFAULT '' COMMENT '地址',
  `status` ENUM('default', 'freeze', 'cancel') NOT NULL DEFAULT 'default' COMMENT '状态',
  `register_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `register_ip` VARCHAR(45) NOT NULL DEFAULT '0' COMMENT '注册IP',
  `last_login_time` DATETIME DEFAULT NULL COMMENT '最后登陆时间',
  `last_login_ip` VARCHAR(45) DEFAULT '' COMMENT '最后登陆IP',
  PRIMARY KEY (`id`, `UUID`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '用户表';


-- -----------------------------------------------------
-- Table `code_template`.`login_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`login_log`;
CREATE TABLE IF NOT EXISTS `code_template`.`login_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `login_time` TIMESTAMP NOT NULL COMMENT '登陆时间',
  `login_ip` VARCHAR(45) DEFAULT '' COMMENT '登陆IP',
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '登陆记录表';


-- -----------------------------------------------------
-- Table `code_template`.`default_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`default_category`;
CREATE TABLE IF NOT EXISTS `code_template`.`default_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL COMMENT '种类名称',
  `number` VARCHAR(45) DEFAULT '' COMMENT '种类编号',
  `desc` VARCHAR(45) DEFAULT '' COMMENT '描述',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '系统默认类别表';


-- -----------------------------------------------------
-- Table `code_template`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`category`;
CREATE TABLE IF NOT EXISTS `code_template`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL COMMENT '种类名称',
  `number` VARCHAR(45) NOT NULL COMMENT '种类编号',
  `type` ENUM('default', 'freeze') NOT NULL DEFAULT 'default' COMMENT '类型',
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '类别表';


-- -----------------------------------------------------
-- Table `code_template`.`draft_box`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`draft_box`;
CREATE TABLE IF NOT EXISTS `code_template`.`draft_box` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL UNIQUE,
  `work_name` VARCHAR(45) NOT NULL COMMENT '作品名称',
  `save_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '保存时间',
  `template` TEXT COMMENT '模板',
  `css` TEXT COMMENT '样式',
  `params` TEXT COMMENT '参数',
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '草稿箱';


-- -----------------------------------------------------
-- Table `code_template`.`template`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`template`;
CREATE TABLE IF NOT EXISTS `code_template`.`template` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL UNIQUE,
  `body` TEXT NOT NULL COMMENT '模板内容',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '模板表';


-- -----------------------------------------------------
-- Table `code_template`.`css`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`css`;
CREATE TABLE IF NOT EXISTS `code_template`.`css` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL UNIQUE,
  `body` TEXT NOT NULL COMMENT '样式内容',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '样式表';


-- -----------------------------------------------------
-- Table `code_template`.`params`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`params`;
CREATE TABLE IF NOT EXISTS `code_template`.`params` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL UNIQUE,
  `body` TEXT NOT NULL COMMENT '参数内容',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '参数表';


-- -----------------------------------------------------
-- Table `code_template`.`works`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`works`;
CREATE TABLE IF NOT EXISTS `code_template`.`works` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL UNIQUE,
  `name` VARCHAR(45) NOT NULL COMMENT '名称',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `type` ENUM('system', 'public', 'private') NULL DEFAULT 'private' COMMENT '类型',
  `status` ENUM('default', 'freeze') NULL DEFAULT 'default' COMMENT '状态',
  `desc` VARCHAR(45) NULL COMMENT '描述',
  `collectors` INT DEFAULT 0 COMMENT '收藏人数',
  `pageviews` INT DEFAULT 0 COMMENT '浏览次数',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `template_id` VARCHAR(45) NOT NULL COMMENT '模板Id',
  `css_id` VARCHAR(45) NOT NULL COMMENT '样式Id',
  `params_id` VARCHAR(45) NOT NULL COMMENT '参数Id',
  `default_category_no` VARCHAR(45) DEFAULT '0' COMMENT '默认种类Number',
  PRIMARY KEY (`id`, `UUID`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '作品表';


-- -----------------------------------------------------
-- Table `code_template`.`collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`collection`;
CREATE TABLE IF NOT EXISTS `code_template`.`collection` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户Id',
  `works_UUID` VARCHAR(45) NOT NULL COMMENT '作品Id',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '用户收藏表';


-- -----------------------------------------------------
-- Table `code_template`.`my_works`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`my_works`;
CREATE TABLE IF NOT EXISTS `code_template`.`my_works` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户Id',
  `works_UUID` VARCHAR(45) NOT NULL COMMENT '作品Id',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `code_template`.`archives`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`archives`;
CREATE TABLE IF NOT EXISTS `code_template`.`archives` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `time` TIMESTAMP NOT NULL COMMENT '时间',
  `author_id` INT NOT NULL COMMENT '作者Id',
  `author_name` VARCHAR(45) NOT NULL COMMENT '作者名称',
  `work_id` INT NOT NULL COMMENT '作品Id',
  `work_name` VARCHAR(45) NOT NULL COMMENT '作品名称',
  `work_desc` VARCHAR(45) DEFAULT NULL COMMENT '作品描述',
  `work_create_time` DATETIME DEFAULT NULL COMMENT '作品创建时间',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '归档表';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
