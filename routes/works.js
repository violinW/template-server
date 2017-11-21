var express = require('express');
var router = express.Router();
var dbName = require("../config/config.json").dbName;

module.exports = (Anne)=> {
  var worksDao = require('../dao/worksDao')(dbName, Anne);


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

//发布作品
  router.get('/public/:id', function (req, res, next) {
    worksDao.publicWork(req, res, next);
  });

//添加个人作品
  router.post('/add', function (req, res, next) {
    worksDao.addWork(req, res, next);
  });

//获取个人作品列表
  router.get('/myWorks/list', function (req, res, next) {
    worksDao.myWorksList(req, res, next);
  });

//删除个人作品
  router.get('/myWorks/delete/:id', function (req, res, next) {
    worksDao.deleteMyWorks(req, res, next);
  });


  return router;
}
