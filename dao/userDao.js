'use strict';
module.exports = (dbName, Anne)=> {
  const {businessModel, logger, jwt, config, bcrypt, _} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure, dataType} = businessModel;

  const loginMethods = CommonUseCase(dbName, "User", "user_login");
  const registerMethods = CommonUseCase(dbName, "User", "user_register");
  const SALT_WORK_FACTOR = 10;

  return {
    register(req, res, next) {
      //查找最后一个用户的编号
      return registerMethods.getAllDataList('register_time', 'desc')
        .then((list)=> {
          const lastNo = list.length ? list[0].user_number : 0;
          logger.debug('lastNo:' + list);
          const data = req.body;
          data.GUID = dataType.createUUID();
          //用户编号
          data.userNumber = _.padStart((parseInt(lastNo) + 1).toString(), 8, '0');
          data.status = "default";
          data.register_time = new Date();
          logger.debug('display data:' + JSON.stringify(data));
          //数据处理(将显示字段转换成数据库字段)
          const dealData = dataStructure.getModel('User_Basic_Info').displayToSource(data);

          logger.debug('source data:' + JSON.stringify(dealData));
          return dealData;

        })
        .then((dealData)=> {
          // 进行加密
          bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) {
              return next(err);
            }
            bcrypt.hash(dealData.password, salt, function (err, hash) {
              if (err) {
                return next(err);
              }
              dealData.password = hash;

              return registerMethods.addSimpleList(dealData)
                .then((data)=> {
                  logger.trace(data);
                  res.status(200).json({
                    id: dealData.UUID
                  });
                })
                .catch((error)=> {
                  logger.trace(error);
                  return next(error);
                });
            })
          });
        })
    },
    queryById(req, res, next){
      logger.debug(`id: ${req.query.id}`);
      return registerMethods.getSimpleDetail('UUID', req.query.id)
        .then((data)=> {
          logger.trace(data);
          //数据处理(将数据库字段转换成显示字段)
          const dealData = dataStructure.getModel('User_Basic_Info').sourceToDisplay(data[0]);
          res.status(200).json(dealData);
        })
        .catch((error)=> {
          logger.trace(error);
          next(error);
        });
    },
    delete(req, res, next){
      return registerMethods.deleteById(req.query.id)
        .then((data)=> {
          logger.trace(data);
          res.status(200).json(data);
        })
        .catch((error)=> {
          logger.trace(error);
          next(error);
        });
    },
    update(req, res, next){
      const data = req.body;
      logger.debug('display data:' + JSON.stringify(data));
      //数据处理(将显示字段转换成数据库字段)
      const dealData = dataStructure.getModel('User_Basic_Info').displayToSource(data);

      logger.debug('source data:' + JSON.stringify(dealData));

      return registerMethods.putSimpleData(req.query.id, dealData)
        .then((data)=> {
          logger.trace(data);
          res.sendStatus(200);
        })
        .catch((error)=> {
          logger.trace(error);
          next(error);
        });
    },
    login(req, res, next){
      const username = req.body.username;
      const password = req.body.password;

      logger.debug(`username: ${username}, password: ${password}`);

      return loginMethods.getList({
          nickname: username
        }, null, null, 10, 1, 'register_time', 'desc')
        .then(list=> {
          //如果能够查到用户数据则验证通过,否则验证失败
          if (list.length === 0) {
            return Promise.reject('找不到用户');
          } else if (list.length) {
            let pw = list[0].password;
            let userId = list[0].UUID;
            return {
              pw,
              userId
            };
          } else {
            return Promise.reject('fail');
          }
        })
        .then(data=> {
          return new Promise(function (resolve, reject) {
            //比较密码
            bcrypt.compare(password, data.pw, function (err, res) {
              logger.debug(`res: ${res}`);
              if (err || !res) {
                reject('密码错误');
              }
              resolve({
                userId: data.userId
              });
            });
          });
        })
        //生成jwt
        .then(data=> {
          logger.debug(`data: ${data}`)
          let jti = (Math.random() * 100000000000000000).toString();
          let iat = Date.now() / 1000;
          let payload = {
            jti: jti,                           // jwt id
            iss: config.authConfig.issuer,             // jwt 签发者
            iat: iat,                           // 签发时间
            exp: iat + config.authConfig.expire,       // 失效时间
            sub: data.userId            // 使用用户
          };
          logger.debug(`payload: ${JSON.stringify(payload)}`);

          let token = jwt.sign(payload, config.authConfig.secret);
          logger.debug(`token: ${token}`);
          res.status(200).json({token: token});
        })
        .catch((error)=> {
          logger.error(error);
          next(error);
        })

    }
  }
}