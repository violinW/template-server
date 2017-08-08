'use strict';
module.exports = (dbName, Anne) => {
    const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure, dataType} = businessModel;

    const worksMethods = CommonUseCase(dbName, "Works", "default");
    const defaultCategoryMethods = CommonUseCase(dbName, "DefaultCategory", "default");

    return {
        getWorksGroupList(req, res, next) {
            const data_size = req.query.size;
            logger.debug(`data size: ${data_size}`);

            return defaultCategoryMethods.getAllDataList('id', 'asc')
                .then((default_category_list) => {
                    return Promise.map(default_category_list, (item) => {
                        return worksMethods.getList({'default_category_id': item.id}, null, null, 10, 1, 'create_time', 'desc')
                            .then((list) => {
                                return {
                                    categoryId: item.id,
                                    categoryName: item.name,
                                    works: list
                                }
                            })
                    })
                })
                .then((data) => {
                    //数据转换
                    return _.map(data, (category) => {
                        let transferData = category;
                        transferData.works = dataStructure.getModel('Works').displayToSource(category.works);
                        return transferData;
                    });
                })
                .then((result) => {
                    logger.trace(JSON.stringify(result));
                    res.status(200).json(result);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        getWorksList(req, res, next) {
            const page = req.query.page;
            const pageSize = req.query.pageSize;
            const keywords = req.query.keywords;
            logger.debug(`page: ${page}, pageSize: ${pageSize}, keywords: ${keywords}`);

            return worksMethods.getList({}, keywords, 'name', pageSize, page, 'create_time', 'desc')
                .then((list) => {
                    let result = dataStructure.getModel('Works').displayToSource(list);
                    logger.trace(JSON.stringify(result));
                    res.status(200).json(result);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        getWorksDetail(req, res, next) {
            const id = req.query.id;
            logger.debug(`id: ${id}`);

            return worksMethods.getSimpleDetail('UUID', id)
                .then((details) => {
                    let result = dataStructure.getModel('Works').displayToSource(details.length && details[0]);
                    logger.trace(JSON.stringify(result));
                    res.status(200).json(result);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        publicWork(req, res, next) {
            const my_works_id = req.query.id;
            logger.debug(`id: ${my_works_id}`);

            return worksMethods.putSimpleData(my_works_id, {type: dataType.enum('works_type').convertToKey('公开类型')})
                .then((result) => {
                    res.status(200).send('更新成功');
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },

    }
};