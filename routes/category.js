var express = require('express');
var router = express.Router();
var dbName = require("../config/config.json").dbName;

module.exports = (Anne)=> {
  var categoryDao = require('../dao/categoryDao')(dbName, Anne);

// 添加草稿
  router.get('/list', function (req, res, next) {
    categoryDao.getList(req, res, next);
  });

  return router;
}

