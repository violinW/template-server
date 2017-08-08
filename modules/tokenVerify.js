'use strict';
const jwt = require('jsonwebtoken');
const secret = require('../config/config.json').authConfig.secret;
const Logger = require('logger-romens');
const logger = new Logger();

module.exports = (req, res, next)=> {
  //取出token
  var token = req.header('authorization');
  if (!token) {
    res.status(500).send('缺少token！')
  } else
    tokenVerify(token, function (error, payload) {
      if (error) {
        res.status(500).send('用户验证失败！')
      } else {
        const userId = payload.sub;
        req.userId = userId;
        next();
      }
    })
};

let tokenVerify = (token, callback)=> {
  jwt.verify(token, secret, function (error, payload) {
    if (error) {
      logger.error(error);
      return callback(error);
    }

    callback(null, payload);
  });
}