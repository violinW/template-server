'use strict';
module.exports = (dbName, Anne) => {
    const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure, dataType} = businessModel;

    const HotelBrandMethods = CommonUseCase(dbName, "HotelBrand", "default");
    const HotelStoreMethods = CommonUseCase(dbName, "HotelStore", "default");

    return {
        /**
         * 获取酒店品牌列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getBrandList(req, res, next) {

            return HotelBrandMethods.getAllDataList('create_time', 'asc')
                .then((result) => {
                    let data = dataStructure.getModel('Hotel_Brand').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 获取酒店品牌列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        addHotelBrand(req, res, next) {
            const data = req.body;
            logger.debug(`display data: ${JSON.stringify(data)}`);

            let insertData = dataStructure.getModel('Hotel_Brand').displayToSource(data);
            insertData.create_time = new Date();
            logger.debug(`source data: ${JSON.stringify(insertData)}`);

            return HotelBrandMethods.addSimpleList(insertData)
                .then((result) => {
                    res.status(200).json({msg: '新增酒店品牌成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 删除酒店品牌
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        deleteHotelBrand(req, res, next) {
            const hotelBrandID = req.params.brandId;
            logger.debug(`hotelBrandID: ${hotelBrandID}`);

            return HotelBrandMethods.deleteById(hotelBrandID)
                .then((result) => {
                    res.status(200).json({msg: '删除酒店品牌成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 获取所有酒店门店列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getStoreAllList(req, res, next) {

            return HotelStoreMethods.getAllDataList("update_time", "desc")
                .then((result) => {
                    let data = dataStructure.getModel('Hotel_Store').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 获取酒店门店列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getStoreList(req, res, next) {
            const brandID = req.params.brandId;
            logger.debug(`brandID: ${brandID}`);

            let filter = {
                brand_id: brandID
            };

            return HotelStoreMethods.getList(filter, null, null, null, null, "update_time", "desc")
                .then((result) => {
                    let data = dataStructure.getModel('Hotel_Store').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 获取酒店门店详情
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getStoreDetail(req, res, next) {
            const storeId = req.params.hotelId;
            logger.debug(`storeId: ${storeId}`);

            return HotelStoreMethods.getSimpleDetail("id", storeId)
                .then((result) => {
                    let data = dataStructure.getModel('Hotel_Store').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 添加酒店门店
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        addStore(req, res, next) {
            const data = req.body;
            logger.debug(`display data: ${JSON.stringify(data)}`);

            let insertData = dataStructure.getModel('Hotel_Store').displayToSource(data);
            insertData.create_time = new Date();
            logger.debug(`source data: ${JSON.stringify(insertData)}`);

            return HotelStoreMethods.addSimpleList(insertData)
                .then((result) => {
                    res.status(200).json({msg: '新增酒店门店成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 删除酒店门店
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        deleteStore(req, res, next) {
            const storeId = req.params.hotelId;
            logger.debug(`storeId: ${storeId}`);

            return HotelStoreMethods.deleteById(storeId)
                .then((result) => {
                    res.status(200).json({msg: '删除酒店门店成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 删除酒店门店
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        deleteStore(req, res, next) {
            const storeId = req.params.hotelId;
            logger.debug(`storeId: ${storeId}`);

            return HotelStoreMethods.deleteById(storeId)
                .then((result) => {
                    res.status(200).json({msg: '删除酒店门店成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },

    }
};