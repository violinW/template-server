var express = require('express');
var router = express.Router();

var dbName = "code_template";

const Assistent = require('../assistant/index');
const Anne = Assistent.Anne;
var draftDao = require('../dao/draftDao')(dbName, Anne);


// 获取作品分组列表
router.post('/add', function(req, res, next) {
  draftDao.addDraft(req, res, next);
});


module.exports = router;
