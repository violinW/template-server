'use strict';
module.exports = (dbName, Anne)=> {
  const {businessModel, _, logger, config, Promise} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure, dataType} = businessModel;

  const worksMethods = CommonUseCase(dbName, "Works", "default");
  const defaultCategoryMethods = CommonUseCase(dbName, "DefaultCategory", "default");

  return {
    getWorksGroupList(req, res, next){
      const data_size = req.query.size;
      logger.debug(`data size: ${data_size}`);

      return defaultCategoryMethods.getAllDataList('id', 'asc')
        .then((default_category_list)=>{
          return Promise.map(default_category_list, (item)=> {
            return worksMethods.getList({'default_category_id': item.id}, null, null, 10, 1, 'create_time', 'desc')
                .then((list)=>{
                  return {
                    categoryId: item.id,
                    categoryName: item.name,
                    works: list
                  }
                })
          })
        })
        .then((data)=>{
          //数据转换
          return  _.map(data, (category)=>{
            let transferData = category;
            transferData.works = dataStructure.getModel('Works').sourceToDisplay(category.works);
            return transferData;
          });
        })
        .then((result)=>{
          logger.trace(result);
          res.status(200).json(result);
        })
        .catch((error)=> {
          logger.trace(error);
          next(error);
        });
    }
  }
};