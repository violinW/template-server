DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `storeId` INT NOT NULL COMMENT '门店Id',
  `number` VARCHAR(32) NOT NULL COMMENT '订单编号',
  `datetime` DATE NOT NULL COMMENT '开单日期',
  `operatorId` INT NOT NULL COMMENT '操作员Id',
  `orderTotal` INT NOT NULL COMMENT '总计',
  `remarkTotal` INT NOT NULL COMMENT '备注后总计',
  `settlement` INT NOT NULL DEFAULT FALSE COMMENT '是否结算',
  `obsolete` INT NOT NULL DEFAULT FALSE COMMENT '是否作废',
  `signature` TEXT COMMENT '签名',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '开单表';