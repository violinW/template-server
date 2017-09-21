var express = require('express');
var router = express.Router();

var dbName = "code_template";

const Assistent = require('../assistant/index');
const Anne = Assistent.Anne;
var draftDao = require('../dao/draftDao')(dbName, Anne);


// 添加草稿
router.post('/add', function(req, res, next) {
  draftDao.addDraft(req, res, next);
});

// 添加草稿
router.post('/edit/:id', function(req, res, next) {
  draftDao.editDraft(req, res, next);
});

// 按作者获取草稿列表
router.get('/userList', function(req, res, next) {
  draftDao.getDraftList(req, res, next);
});

// 按作者获取草稿详情
router.get('/userDetail/:id', function(req, res, next) {
  draftDao.getDraftDetail(req, res, next);
});


module.exports = router;
