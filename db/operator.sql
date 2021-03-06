DROP TABLE IF EXISTS `operator`;
CREATE TABLE IF NOT EXISTS `operator` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `operatorName` VARCHAR(64) NOT NULL COMMENT '操作员名称',
  `password` TEXT NOT NULL COMMENT '密码',
  `permissionNumbers` VARCHAR(64) NOT NULL COMMENT '权限编码列表',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '操作员表';
