'use strict';
module.exports = (dbName, Anne) => {
    const {businessModel, _, logger, config, Promise, moment, knex} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure, dataType} = businessModel;

    const OrderMethods = CommonUseCase(dbName, "Order", "default");
    const OrderSingelProductMethods = CommonUseCase(dbName, "OrderSingelProduct", "default");
    const userMethods = CommonUseCase(dbName, "Operator", "default");

    return {
        /**
         * 获取门店订单列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getOrderList(req, res, next) {
            const hotelId = req.params.hotelId;
            const operatorId = req.query.operatorId;
            const datetime = req.query.datetime;
            logger.debug(`hotelId: ${hotelId}, operatorId: ${operatorId}, datetime: ${datetime}`);

            let filter = {
                storeId: hotelId,
                obsolete: 0
            };

            if (operatorId) {
                filter["operatorId"] = operatorId;
            }

            if (datetime) {
                filter["datetime"] = datetime;
            }

            return OrderMethods.getList(filter, null, null, null, null, "number", "desc")
                .then((result) => {
                    let data = dataStructure.getModel('Order').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    ``
                    next(error);
                });
        },
        /**
         * 添加订单
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        addOrder(req, res, next) {
            const data = req.body;
            logger.debug(`display data: ${JSON.stringify(data)}`);

            let order = dataStructure.getModel('Order').displayToSource(data.order);
            order.create_time = new Date();
            logger.debug(`source data order: ${JSON.stringify(order)}`);

            let orderProduct = dataStructure.getModel('Order_Single_Product').displayToSource(data.orderProduct);
            _.each(orderProduct, (item) => {
                item.create_time = new Date();
            });
            logger.debug(`source data orderProduct: ${JSON.stringify(orderProduct)}`);

            return OrderMethods.addSimpleList(order)
                .then((result) => {
                    _.each(orderProduct, item => {
                        item.orderId = result;
                    });
                    return OrderSingelProductMethods.addSimpleList(orderProduct)
                })
                .then((result) => {
                    res.status(200).json({msg: '新增订单成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 删除订单
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        deleteOrder(req, res, next) {
            const orderId = req.params.orderId;
            logger.debug(`orderID: ${orderId}`);

            let data = {
                obsolete: 1
            };

            return OrderMethods.putSimpleData(orderId, data)
                .then((result) => {
                    res.status(200).json({msg: '删除订单成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 根据门店获取订单编号
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getOrderNumberByHotelId(req, res, next) {
            logger.debug(`enter getOrderNumberByHotelId`);
            let dateStr = moment().format("YYYYMMDD");
            logger.debug(`dateStr: ${dateStr}`);

            return OrderMethods.getList({}, dateStr, "number", null, null, "number", "desc")
                .then((result) => {
                    logger.debug(`result: ${JSON.stringify(result)}`);
                    let lastCode;
                    if (result.length) {
                        let num = result[0].number;
                        lastCode = dateStr + _.padStart((num.split(dateStr)[1] * 1 + 1), 6, "0");
                        logger.debug(`lastCode: ${lastCode}`);
                    } else {
                        lastCode = dateStr + "000001";
                    }
                    res.status(200).json({number: lastCode});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 编辑订单
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        editOrder(req, res, next) {
            const orderID = req.params.orderId;
            logger.debug(`orderID: ${orderID}`);

            const data = req.body;
            logger.debug(`display data: ${JSON.stringify(data)}`);

            let order = dataStructure.getModel('Order').displayToSource(data.order);
            logger.debug(`source data order: ${JSON.stringify(order)}`);

            let orderProduct = dataStructure.getModel('Order_Single_Product').displayToSource(data.orderProduct);
            _.each(orderProduct, (item) => {
                item.orderId = orderID;
                item.create_time = new Date();
            });
            logger.debug(`source data orderProduct: ${JSON.stringify(orderProduct)}`);

            return OrderMethods.putSimpleData(orderID, order)
                .then((result) => {
                    return OrderSingelProductMethods.deleteByField("orderId", orderID);
                })
                .then((result) => {
                    return OrderSingelProductMethods.addSimpleList(orderProduct)
                })
                .then((result) => {
                    res.status(200).json({msg: '编辑订单成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 订单详情
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        orderDetail(req, res, next) {
            const orderID = req.params.orderId;
            logger.debug(`orderID: ${orderID}`);

            let data = {};

            return OrderMethods.getSimpleDetail("id", orderID)
                .then((order) => {
                    data.order = order[0];
                    return OrderSingelProductMethods.getList({
                        "orderId": orderID
                    }, null, null, null, null, "create_time", "asc");
                })
                .then((orderProduct) => {
                    data.orderProduct = orderProduct;
                    return userMethods.getSimpleDetail({
                        "id": data.order.operatorId
                    });
                })
                .then((user) => {
                    logger.debug(`user: ${JSON.stringify(user)}`);
                    data.order.operatorName = user[0].operatorName;
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 删除订单
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        orderSignature(req, res, next) {
            const orderId = req.params.orderId;
            const img = req.body.img;
            logger.debug(`orderID: ${orderId}, img: ${img}`);

            let data = {
                signature: img
            };

            return OrderMethods.putSimpleData(orderId, data)
                .then((result) => {
                    res.status(200).json({msg: '签名成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 订单结算
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        orderSettlement(req, res, next) {
            const startTime = req.body.startTime;
            const endTime = req.body.endTime;
            const hotelStoreIds = req.body.hotelStoreIds;
            logger.debug(`startTime: ${startTime}, endTime: ${endTime}, hotelStoreIds: ${JSON.stringify(hotelStoreIds)}`);

            return knex.withSchema(dbName)
                .table("order")
                .leftJoin('hotel_store', 'hotel_store.id', 'order.storeId')
                .select(["storeId", "orderTotal", "remarkTotal", "hotel_store_name"])
                .whereBetween('datetime', [startTime, endTime])
                .whereIn('storeId', hotelStoreIds)
                .then((list) => {
                    logger.debug(`list: ${JSON.stringify(list)}`);
                    let groupList = _.groupBy(list, 'storeId');
                    logger.debug(`groupList: ${JSON.stringify(groupList)}`);
                    return _.map(groupList, (item, key) => {
                        let count = 0, remarkCount = 0;
                        _.each(item, itr => {
                            count += itr.orderTotal;
                            remarkCount += itr.remarkTotal;
                        });
                        return {
                            hotelStoreId: key,
                            hotelStoreName: item[0].hotel_store_name,
                            count,
                            remarkCount
                        }
                    });
                })
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 订单结算
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        orderSettlementSure(req, res, next) {
            const startTime = req.body.startTime;
            const endTime = req.body.endTime;
            const hotelStoreIds = req.body.hotelStoreIds;
            logger.debug(`startTime: ${startTime}, endTime: ${endTime}, hotelStoreIds: ${JSON.stringify(hotelStoreIds)}`);

            return knex.withSchema(dbName)
                .table("order")
                .leftJoin('hotel_store', 'hotel_store.id', 'order.storeId')
                .whereBetween('datetime', [startTime, endTime])
                .whereIn('storeId', hotelStoreIds)
                .update({settlement: 1})
                .then(() => {
                    res.status(200).json({msg: '结算成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
    }
};