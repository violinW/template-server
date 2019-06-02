'use strict';
module.exports = (dbName, Anne) => {
    const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure, dataType} = businessModel;

    const permissionMethods = CommonUseCase(dbName, "Permission", "default");

    return {
        /**
         * 获取权限列表
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        getList(req, res, next) {

            return permissionMethods.getAllDataList('number', 'desc')
                .then((result) => {
                    let data = dataStructure.getModel('Permission').sourceToDisplay(result);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 添加权限
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        addPermission(req, res, next) {
            const data = req.body;
            logger.debug(`display data: ${JSON.stringify(data)}`);

            let insertData = dataStructure.getModel('Permission').displayToSource(data);
            insertData.create_time = new Date();
            logger.debug(`source data: ${JSON.stringify(insertData)}`);

            return permissionMethods.addSimpleList(insertData)
                .then((result) => {
                    res.status(200).json({msg: '新增权限成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        /**
         * 删除权限
         * @param req
         * @param res
         * @param next
         * @returns {Promise.<T>}
         */
        deletePermission(req, res, next) {
            const permissionId = req.params.permissionId;
            logger.debug(`permissionId: ${permissionId}`);

            return permissionMethods.deleteById(permissionId)
                .then((result) => {
                    res.status(200).json({msg: '删除权限成功'});
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
    }
};