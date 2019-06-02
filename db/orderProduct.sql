DROP TABLE IF EXISTS `order_single_product`;
CREATE TABLE IF NOT EXISTS `order_single_product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `productNo` VARCHAR(32) NOT NULL COMMENT '单品编号',
  `orderId` INT NOT NULL COMMENT '订单Id',
  `purchasePrice` INT NOT NULL COMMENT '进价',
  `sellingPrice` INT NOT NULL COMMENT '售价',
  `quantity` INT NOT NULL COMMENT '数量',
  `unitId` INT NOT NULL COMMENT '单位Id',
  `remark` INT NOT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '开单单品表';
