'use strict';
module.exports = (dbName, Anne) => {
  const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure, dataType} = businessModel;

  const defaultCategoryMethods = CommonUseCase(dbName, "DefaultCategory", "default");

  return {
    /**
     * 获取种类列表
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<T>}
     */
    getList(req, res, next) {

      return defaultCategoryMethods.getAllDataList('number', 'asc')
          .then((result) => {
            let data = dataStructure.getModel('Default_Category').sourceToDisplay(result);
            res.status(200).json(data);
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    }
  }
};