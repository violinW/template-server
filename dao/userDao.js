'use strict';
module.exports = (dbName, Anne)=> {
    const {businessModel, logger, jwt, config} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure, dataType} = businessModel;

    const loginMethods = CommonUseCase(dbName, "User", "user_login");
    const registerMethods = CommonUseCase(dbName, "User", "user_register");

    return {
        add(req, res, next) {
            const data = req.body;
            logger.debug('display data:' + JSON.stringify(data));
            //数据处理
            const dealData = dataStructure.getModel('User_Basic_Info').sourceToDisplay(data);
            dealData.UUID = dataType.createUUID();

            logger.debug('source data:' + JSON.stringify(dealData));

            return registerMethods.addSimpleList(dealData)
            .then((data)=> {
                logger.trace(data);
                res.send(data[0]);
            })
            .catch((error)=> {
                logger.trace(error);
                res.send('fail');
            });
        },
        queryById(req, res, next){
            logger.debug(`id: ${req.query.id}`)
            return registerMethods.getSimpleDetail('UUID', req.query.id)
            .then((data)=> {
                logger.trace(data);
                //数据处理
                const dealData = dataStructure.getModel('User_Basic_Info').displayToSource(data[0]);
                res.send(dealData);
            })
            .catch((error)=> {
                logger.trace(error);
                res.send('fail');
            });
        },
        delete(req, res, next){
            return registerMethods.deleteById(req.query.id)
            .then((data)=> {
                logger.trace(data);
                res.send(data);
            })
            .catch((error)=> {
                logger.trace(error);
                res.send('fail');
            });
        },
        update(req, res, next){
            const data = req.body;
            logger.debug('display data:' + JSON.stringify(data));
            //数据处理
            const dealData = dataStructure.getModel('User_Basic_Info').sourceToDisplay(data);

            logger.debug('source data:' + JSON.stringify(dealData));

            return registerMethods.putSimpleData(req.query.id, dealData)
            .then((data)=> {
                logger.trace(data);
                res.send('success');
            })
            .catch((error)=> {
                logger.trace(error);
                res.send('fail');
            });
        },
        login(req, res, next){
            const username = req.body.username;
            const password = req.body.password;

            logger.debug(`username: ${username}, password: ${password}`);

            return loginMethods.getList({
                nickname: username,
                password
            }, null, null, 10, 1, 'register_time', 'desc')
            .then(list=> {
                //如果能够查到用户数据则验证通过,否则验证失败
                if(list.length){
                    return {
                        username
                    }
                }else if(list.length === 0){
                    return Promise.reject('登录不通过');
                }else{
                    return Promise.reject('fail');
                }
            })
            //生成jwt
            .then(data=> {
                let jti = (Math.random() * 100000000000000000).toString();
                let iat = Date.now() / 1000;
                let payload = {
                    jti: jti,                           // jwt id
                    iss: config.authConfig.issuer,             // jwt 签发者
                    iat: iat,                           // 签发时间
                    exp: iat + config.authConfig.expire,       // 失效时间
                    sub: data.username,            // 使用用户
                };
                logger.debug(`payload: ${JSON.stringify(payload)}`)

                let token = jwt.sign(payload, config.authConfig.secret);
                logger.debug(`token: ${token}`)
                res.send(token);
            })
            .catch((error)=> {
                logger.trace(error);
                res.send('fail');
            })
        }
    }
}