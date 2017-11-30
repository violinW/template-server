'use strict';
module.exports = (dbName, Anne) => {
  const {businessModel, _, logger, Promise, knex} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure, dataType} = businessModel;

  const worksMethods = CommonUseCase(dbName, "Works", "default");
  const myWorkDetailMethods = CommonUseCase(dbName, "Works", "self");
  const myWorkInfoMethods = CommonUseCase(dbName, "Works", "info");
  const defaultCategoryMethods = CommonUseCase(dbName, "DefaultCategory", "default");
  const myWorksMethods = CommonUseCase(dbName, "MyWorks", "default");
  const cssMethods = CommonUseCase(dbName, "Css", "default");
  const paramsMethods = CommonUseCase(dbName, "Params", "default");
  const templateMethods = CommonUseCase(dbName, "Template", "default");


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

      return myWorkInfoMethods.getJoinDetail(id)
          .then((detail)=> {
            let data = {
              name: detail.name,
              type: detail.type,
              reference: detail.reference,
              defaultCategoryName: detail.default_categoryInfo && detail.default_categoryInfo.name,
              css: detail.cssInfo.body,
              params: detail.paramsInfo.body,
              template: detail.templateInfo.body
            }
            logger.trace(JSON.stringify(data));
            res.status(200).json(data);
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    publicWork(req, res, next) {
      const my_works_id = req.params.id;
      const default_category_no = req.query.defaultCategoryNo;
      logger.debug(`id: ${my_works_id}, default_category_no: ${default_category_no}`);

      return worksMethods.putSimpleData(my_works_id, {
        type: dataType.enum('works_type').convertToKey('公开类型'),
        default_category_no
      })
        .then((result) => {
          res.status(200).json({message:'更新成功'});
        })
        .catch((error) => {
          logger.trace(error);
          next(error);
        });
    },
    cancelWork(req, res, next) {
      const my_works_id = req.params.id;
      logger.debug(`id: ${my_works_id}`);

      return worksMethods.putSimpleData(my_works_id, {
        type: dataType.enum('works_type').convertToKey('私有类型')
      })
        .then((result) => {
          res.status(200).json({message:'更新成功'});
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
          UUID: workId,
          name: data.name,
          reference: data.reference,
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
            return myWorkDetailMethods.addJoinData(workData)
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
            let myList = _.map(result, (item)=> {
              return {
                GUID: item.works_UUID,
                name: item.worksList[0].name
              }
            });
            res.status(200).json(myList);
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    deleteMyWorks(req, res, next){
      const id = req.params.id;
      logger.debug(`id: ${id}`);

      return knex.transaction((trx)=>{
        return worksMethods.getSimpleDetail('UUID', id)
            .then((data)=>{
              return myWorkDetailMethods.deleteByField('UUID', id, trx)
                  .then((result)=>{
                    return Promise.all([
                      cssMethods.deleteByField('UUID', data[0]['css_id']),
                      paramsMethods.deleteByField('UUID', data[0]['params_id']),
                      templateMethods.deleteByField('UUID', data[0]['template_id'])
                    ])
                  })
                  .then((result)=>{
                    return myWorksMethods.deleteByField('works_UUID', id);
                  })
                  .then(trx.commit)
                  .catch(trx.rollback)
            })
      })
      .then((result)=>{
        res.status(200).json({msg: '删除我的作品成功'});
      })
      .catch((error) => {
        logger.trace(error);
        next(error);
      });
    }
  }
};