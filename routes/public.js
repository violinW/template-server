var express = require('express');
var router = express.Router();
var dbName = require("../config/config.json").dbName;

module.exports = (Anne)=> {
  var worksDao = require('../dao/worksDao')(dbName, Anne);


// 获取作品分组列表
  router.get('/home/workList', function (req, res, next) {
    worksDao.getHomepageWorkList(req, res, next);
  });

// 获取作品搜索列表
  router.get('/work/search', function (req, res, next) {
    worksDao.getWorkSearchList(req, res, next);
  });

// 获取作品分组列表
  router.get('/list/group', function (req, res, next) {
    worksDao.getWorksGroupList(req, res, next);
  });

//获取作品筛选列表
  router.get('/list/filter', function (req, res, next) {
    worksDao.getWorksList(req, res, next);
  });

//获取作品详情
  router.get('/myWorks/detail/:id', function (req, res, next) {
    worksDao.getWorksDetail(req, res, next);
  });

// 获取作者作品列表
  router.get('/work/author', function (req, res, next) {
    worksDao.getAuthorSearchList(req, res, next);
  });

  return router;
}
