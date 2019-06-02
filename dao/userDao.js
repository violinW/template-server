'use strict';
module.exports = (dbName, Anne) => {
    const {businessModel, logger, jwt, config, bcrypt, _} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure, dataType} = businessModel;

    const userMethods = CommonUseCase(dbName, "Operator", "default");
    const SALT_WORK_FACTOR = 10;

    return {
        newUser(req, res, next) {
            const data = req.body;
            logger.debug(JSON.stringify(data));
            // 进行加密
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(data.password, salt, function (err, hash) {
                    if (err) {
                        return next(err);
                    }
                    data.password = hash;
                    data.create_time = new Date();

                    return userMethods.addSimpleList(data)
                        .then((data) => {
                            logger.trace(data);
                            res.status(200).json({
                                id: data.id
                            });
                        })
                        .catch((error) => {
                            logger.trace(error);
                            return next(error);
                        });
                })
            });
        },
        getOperatorList(req, res, next) {
            logger.debug(`enter`);
            return userMethods.getAllDataList('update_time', "asc")
                .then((data) => {
                    data.splice(0, 1);
                    logger.trace(data);
                    //数据处理(将数据库字段转换成显示字段)
                    const dealData = dataStructure.getModel('Operator').sourceToDisplay(data);
                    res.status(200).json(dealData);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        getOperatorDetail(req, res, next) {
            const userId = req.params.userId;
            logger.debug(`userId: ${userId}`);

            return userMethods.getSimpleDetail({
                "id": userId
            })
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        delete(req, res, next) {
            const userId = req.params.userId;
            logger.debug(`userId: ${userId}`);

            return userMethods.deleteById(userId)
                .then((data) => {
                    logger.trace(data);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        update(req, res, next) {
            return userMethods.putSimpleData(req.query.id, {
                permissionNumbers: req.body.permissionNumbers
            })
                .then((data) => {
                    logger.trace(data);
                    res.status(200).json(data);
                })
                .catch((error) => {
                    logger.trace(error);
                    next(error);
                });
        },
        login(req, res, next) {
            const operatorName = req.body.operatorName;
            const password = req.body.password;

            logger.debug(`operatorName: ${operatorName}, password: ${password}`);

            return userMethods.getList({
                operatorName: operatorName
            }, null, null, 1, 10, 'create_time', 'desc')
                .then(list => {
                    //如果能够查到用户数据则验证通过,否则验证失败
                    if (list.length === 0) {
                        return Promise.reject({code: 401, msg: '找不到用户'});
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
                .then(data => {
                    return new Promise(function (resolve, reject) {
                        logger.debug(`data.pw: ${data.pw}`);
                        //比较密码
                        bcrypt.compare(password, data.pw, function (err, res) {
                            logger.debug(`res: ${res}`);
                            if (err || !res) {
                                reject({code: 402, msg: '密码错误'});
                            }
                            resolve({
                                userId: data.userId
                            });
                        });
                    });
                })
                //生成jwt
                .then(data => {
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
                .catch((error) => {
                    logger.error(error);
                    next(error);
                })

        }
    }
}