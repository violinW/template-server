'use strict';
module.exports = (dbName, Anne) => {
  const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure, dataType} = businessModel;

  const draftMethods = CommonUseCase(dbName, "Draft", "default");
  const draftExtMethods = CommonUseCase(dbName, "Draft", "draft_detail");

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

      let insertData = dataStructure.getModel('Draft_Box_Ext').displayToSource(data);
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
     * 编辑草稿
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<T>}
     */
    editDraft(req, res, next){
      const data = req.body;
      const draftID = req.params.id;
      logger.debug(`draftID: ${draftID}, display data: ${JSON.stringify(data)}`);

      let updateData = dataStructure.getModel('Draft_Box_Ext').displayToSource(data);
      updateData.UUID = dataType.createUUID();
      updateData.user_UUID = req.userId;
      logger.debug(`source data: ${JSON.stringify(updateData)}`);

      return draftMethods.putSimpleData(draftID, updateData)
          .then((result) => {
            res.status(200).json({msg: '编辑草稿成功'});
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
            let result = dataStructure.getModel('Draft_Box_Basic').sourceToDisplay(list);
            logger.trace(JSON.stringify(result));
            res.status(200).json(result);
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    /**
     * 获取草稿详情
     * @param req
     * @param res
     * @param next
     */
    getDraftDetail(req, res, next){
      const userID = req.userId;
      const draftID = req.params.id;
      logger.debug(`userID: ${userID}, draftID: ${draftID}`);

      return draftExtMethods.getList({
        'user_UUID': userID,
        'UUID': draftID
      }, null, null, null, null, 'save_time')
          .then((list) => {
            let detail = list[0];
            let result = dataStructure.getModel('Draft_Box_Ext').sourceToDisplay(detail);
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