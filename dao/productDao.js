'use strict';
module.exports = (dbName, Anne) => {
    const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure, dataType} = businessModel;

    const OrderSingelProductMethods = CommonUseCase(dbName, "OrderSingelProduct", "default");
    const productMethods = CommonUseCase(dbName, "Product", "default");

    return {
        /**
         * 获取商品列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getList(req, res, next) {

            return productMethods.getAllDataList('number', 'asc')
                .then((result) => {
                    let data = dataStructure.getModel('Product').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 获取商品列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getListByKeywords(req, res, next) {
            logger.debug(`code: ${req.query.code}`);

            return productMethods.getList({}, req.query.code, "mnemonicCode", null, null, "mnemonicCode", "asc")
                .then((result) => {
                    let data = dataStructure.getModel('Product').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 添加商品
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        addProduct(req, res, next) {
            const data = req.body;
            logger.debug(`display data: ${JSON.stringify(data)}`);

            let insertData = dataStructure.getModel('Product').displayToSource(data);
            insertData.create_time = new Date();
            logger.debug(`source data: ${JSON.stringify(insertData)}`);

            return productMethods.addSimpleList(insertData)
                .then((result) => {
                    res.status(200).json({msg: '新增商品成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 删除商品
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        deleteProduct(req, res, next) {
            const productId = req.params.productId;
            logger.debug(`productId: ${productId}`);

            return productMethods.getSimpleDetail("id", productId)
                .then((result) => {
                    logger.debug(`list: ${JSON.stringify(result)}`);
                    if(result.length){
                        return OrderSingelProductMethods.getSimpleDetail("productNo", result[0].number)
                    }
                    logger.trace('找不到商品！');
                    next('找不到商品！');
                })
                .then((result) => {
                    if (result.length) {
                        logger.trace('该商品有相关的订单关联，不可删除！');
                        next('该商品有相关的订单关联，不可删除！');
                        return;
                    }
                    return productMethods.deleteById(productId);
                })
                .then((result) => {
                    res.status(200).json({msg: '删除商品成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
    }
};