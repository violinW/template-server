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
            res.status(200).json({message: '更新成功'});
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
            res.status(200).json({message: '更新成功'});
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
    /**
     * 编辑作品
     * @param req
     * @param res
     * @param next
     * @returns {Promise<R>|Promise.<T>}
     */
    editWork(req, res, next){
      const work_id = req.params.id;
      const data = req.body;
      logger.debug(`display data: ${JSON.stringify(data)}`);

      const workData = {
        mainData: {
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

      return myWorkDetailMethods.putJoinData(work_id, workData)
          .then((result) => {
            logger.trace(JSON.stringify(result));
            res.status(200).json({msg: '编辑我的作品成功'});
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

      return knex.transaction((trx)=> {
        return worksMethods.getSimpleDetail('UUID', id)
            .then((data)=> {
              return myWorkDetailMethods.deleteByField('UUID', id, trx)
                  .then((result)=> {
                    return Promise.all([
                      cssMethods.deleteByField('UUID', data[0]['css_id']),
                      paramsMethods.deleteByField('UUID', data[0]['params_id']),
                      templateMethods.deleteByField('UUID', data[0]['template_id'])
                    ])
                  })
                  .then((result)=> {
                    return myWorksMethods.deleteByField('works_UUID', id);
                  })
                  .then(trx.commit)
                  .catch(trx.rollback)
            })
      })
          .then((result)=> {
            res.status(200).json({msg: '删除我的作品成功'});
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    getHomepageWorkList(req, res, next){
      let pageSize = 5, page = 1;

      return defaultCategoryMethods.getAllDataList('number', 'asc')
          .then((result) => {
            let data = dataStructure.getModel('Default_Category').sourceToDisplay(result);
            logger.debug(`categorys: ${JSON.stringify(data)}`);
            return Promise.map(data, (category)=> {
              return knex.withSchema(dbName)
                  .from('works')
                  .leftJoin('css', 'works.css_id', 'css.UUID')
                  .leftJoin('params', 'works.params_id', 'params.UUID')
                  .leftJoin('template', 'works.template_id', 'template.UUID')
                  .select(['works.UUID as GUID', 'name', 'reference', 'works.desc as works', 'css.body as css', 'params.body as params', 'template.body as template'])
                  .whereIn("type", ["system", "public"])
                  .andWhere("default_category_no", category.number)
                  .offset((page - 1) * pageSize)
                  .limit(pageSize)
                  .then((works)=> {
                    logger.debug(`works: ${JSON.stringify(works)}`);
                    return {
                      name: category.name,
                      number: category.number,
                      list: dataStructure.getModel('Works').sourceToDisplay(works)
                    };
                  });
            })
          })
          .then((result) => {
            logger.debug(`result: ${JSON.stringify(result)}`);
            res.status(200).json(result);
          })
          .catch((error) => {
            logger.trace(error);
            next(error);
          });
    },
    getWorkSearchList(req, res, next){
      const number = req.query.number;
      const keywords = req.query.keywords;
      const pageSize = req.query.pagesize;
      const page = req.query.page;
      logger.debug(`number: ${number}, keywords: ${keywords}, pageSize: ${pageSize}, page: ${page}`);

      return myWorkInfoMethods.getJoinList(number ? {
        "default_category_no": number
      } : {}, keywords, 'name', pageSize, page, 'update_time', 'desc')
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