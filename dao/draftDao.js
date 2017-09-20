'use strict';
module.exports = (dbName, Anne) => {
  const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure, dataType} = businessModel;

  const draftMethods = CommonUseCase(dbName, "Draft", "default");

  return {
    /**
     * 添加草稿
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<T>}
     */
    addDraft(req, res, next) {
      const data = req.body;
      logger.debug(`display data: ${JSON.stringify(data)}`);

      let insertData = dataStructure.getModel('Draft_Box').displayToSource(data);
      insertData.UUID = dataType.createUUID();
      insertData.user_UUID = req.userId;
      logger.debug(`source data: ${JSON.stringify(insertData)}`);

      return draftMethods.addSimpleList(insertData)
          .then((result) => {
            res.status(200).json({msg: '新增草稿成功'});
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    /**
     * 获取草稿列表
     * @param req
     * @param res
     * @param next
     */
    getDraftList(req, res, next){
      const userID = req.userId;
      logger.debug(`userID: ${userID}`);

      return draftMethods.getList({
        'user_UUID': userID
      }, null, null, null, null, 'save_time')
          .then((list) => {
            let result = dataStructure.getModel('Draft_Box').sourceToDisplay(list);
            logger.trace(JSON.stringify(result));
            res.status(200).json(result);
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    }
  }
};