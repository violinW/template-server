var express = require('express');
var router = express.Router();
var dbName = require("../config/config.json").dbName;

module.exports = (Anne)=> {
  var indexDao = require('../dao/indexDao')(dbName, Anne);

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
  });
  /* 项目助手说明 */
  router.get('/introduction', function (req, res, next) {
    res.render('introduction', {title: 'Express'});
  });

  /* 获取默认数据 */
  router.get('/getDefaultData', function (req, res, next) {
    indexDao.getDefaultData(req, res, next);
  });
  return router;
}
