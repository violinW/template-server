'use strict';
module.exports = (dbName, Anne) => {
  const {businessModel, _, logger, Promise} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure, dataType} = businessModel;

  const worksMethods = CommonUseCase(dbName, "Works", "default");
  const myUserMethods = CommonUseCase(dbName, "Works", "self");
  const defaultCategoryMethods = CommonUseCase(dbName, "DefaultCategory", "default");
  const myWorksMethods = CommonUseCase(dbName, "MyWorks", "default");

  return {
    getWorksGroupList(req, res, next) {
      const data_size = req.query.size;
      logger.debug(`data size: ${data_size}`);

      return defaultCategoryMethods.getAllDataList('id', 'asc')
          .then((default_category_list) => {
            return Promise.map(default_category_list, (item) => {
              return worksMethods.getList({
                'default_category_id': item.id,
                'type': 'public'
              }, null, null, 10, 1, 'create_time', 'desc')
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
              transferData.works = dataStructure.getModel('Works').sourceToDisplay(category.works);
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
            let result = dataStructure.getModel('Works').sourceToDisplay(list);
            logger.trace(JSON.stringify(result));
            res.status(200).json(result);
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    getWorksDetail(req, res, next) {
      const id = req.params.id;
      logger.debug(`id: ${id}`);

      return worksMethods.getSimpleDetail('UUID', id)
          .then((details)=> {
            return worksMethods.putSimpleData(id, {
              "pageviews": (details[0].pageviews + 1)
            })
                .then(()=> {
                  return details;
                })
          })
          .then((details)=> {
            let result = dataStructure.getModel('Works').sourceToDisplay(details.length && details[0]);
            logger.trace(JSON.stringify(result));
            res.status(200).json(result);
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    publicWork(req, res, next) {
      const my_works_id = req.params.id;
      const default_category_id = req.query.categoryId;
      logger.debug(`id: ${my_works_id}, default_category_id: ${default_category_id}`);

      return worksMethods.putSimpleData(my_works_id, {
        type: dataType.enum('works_type').convertToKey('公开类型'),
        default_category_id
      })
          .then((result) => {
            res.status(200).send('更新成功');
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    addWork(req, res, next){
      const userID = req.userId;
      const data = req.body;
      logger.debug(`display data: ${JSON.stringify(data)}`);

      let workId = dataType.createUUID();

      const myWorkMapData = {
        user_UUID: userID,
        works_UUID: workId
      };

      const workData = {
        mainData: {
          UUID: dataType.createUUID(),
          name: data.name,
          template_id: dataType.createUUID(),
          css_id: dataType.createUUID(),
          params_id: dataType.createUUID()
        },
        cssData: [{
          body: data.css
        }],
        paramsData: [{
          body: data.params
        }],
        templateData: [{
          body: data.template
        }]
      };

      logger.debug(`work data: ${JSON.stringify(workData)}`);

      return myWorksMethods.addSimpleList(myWorkMapData)
          .then(()=> {
            return myUserMethods.addJoinData(workData)
          })
          .then((result) => {
            logger.trace(JSON.stringify(result));
            res.status(200).json({msg: '新增我的作品成功'});
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    myWorksList(req, res, next){
      const userID = req.userId;
      logger.debug(`userID: ${userID}`);

      return myWorksMethods.getJoinList({
        'user_UUID': userID
      }, null, null, null, null, 'user_UUID')
          .then((list) => {
            let result = dataStructure.getModel('Works').sourceToDisplay(list);
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