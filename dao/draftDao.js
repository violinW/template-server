'use strict';
module.exports = (dbName, Anne) => {
  const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure, dataType} = businessModel;

  const draftMethods = CommonUseCase(dbName, "Draft", "default");

  return {
    addDraft(req, res, next) {
      const data = req.body;
      logger.debug(`display data: ${JSON.stringify(data)}`);

      let insertData = dataStructure.getModel('Draft_Box').displayToSource(data);
      insertData.UUID = dataType.createUUID();
      insertData.user_UUID = req.userId;
      logger.debug(`source data: ${JSON.stringify(insertData)}`);

      return draftMethods.addData(insertData)
          .then((result) => {
            res.status(200).send('新增成功');
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    }
  }
};