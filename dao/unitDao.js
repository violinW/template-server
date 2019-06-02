'use strict';
module.exports = (dbName, Anne) => {
    const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure, dataType} = businessModel;

    const unitMethods = CommonUseCase(dbName, "Unit", "default");
    const OrderSingelProductMethods = CommonUseCase(dbName, "OrderSingelProduct", "default");

    return {
        /**
         * 获取单位列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getList(req, res, next) {

            return unitMethods.getAllDataList('create_time', 'asc')
                .then((result) => {
                    let data = dataStructure.getModel('Unit').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 添加单位
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        addUnit(req, res, next) {
            const data = req.body;
            logger.debug(`display data: ${JSON.stringify(data)}`);

            let insertData = dataStructure.getModel('Unit').displayToSource(data);
            insertData.create_time = new Date();
            logger.debug(`source data: ${JSON.stringify(insertData)}`);

            return unitMethods.addSimpleList(insertData)
                .then((result) => {
                    res.status(200).json({msg: '新增单位成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 删除单位
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        deleteUnit(req, res, next) {
            const unitId = req.params.unitId;
            logger.debug(`unitId: ${unitId}`);

            return OrderSingelProductMethods.getSimpleDetail("unitId", unitId)
                .then((result) => {
                    if (result.length) {
                        logger.trace('该单位有相关的订单关联，不可删除！');
                        next('该单位有相关的订单关联，不可删除！');
                        return;
                    }
                    return unitMethods.deleteById(unitId);
                })
                .then((result) => {
                    res.status(200).json({msg: '删除单位成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
    }
};