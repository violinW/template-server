var express = require('express');
var router = express.Router();

var dbName = "code_template";

const Assistent = require('../assistant/index');
const Anne = Assistent.Anne;
var worksDao = require('../dao/worksDao')(dbName, Anne);


// 获取作品分组列表
router.get('/list/group', function(req, res, next) {
  worksDao.getWorksGroupList(req, res, next);
});

//获取作品筛选列表
router.get('/list/filter', function(req, res, next) {
    worksDao.getWorksList(req, res, next);
});

//获取作品详情
router.get('/detail/:id', function(req, res, next) {
    worksDao.getWorksDetail(req, res, next);
});

//发布作品
router.get('/public/:id', function(req, res, next) {
    worksDao.publicWork(req, res, next);
});

module.exports = router;
