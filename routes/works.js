var express = require('express');
var router = express.Router();

var dbName = "code_template";

const Assistent = require('../assistant/index');
const Anne = Assistent.Anne;
var worksDao = require('../dao/worksDao')(dbName, Anne);


// 增加用户
//TODO 同时支持get,post
router.get('/list/group', function(req, res, next) {
  worksDao.getWorksGroupList(req, res, next);
});


module.exports = router;
