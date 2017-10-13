var express = require('express');
var router = express.Router();

var dbName = "code_template";


module.exports = (Anne)=> {
  var userDao = require('../dao/userDao')(dbName, Anne);

  /* GET users listing. */
  router.get('/', function (req, res, next) {
    //res.send('respond with a resource');
    res.render('updateUser');
  });


// 增加用户
//TODO 同时支持get,post
  router.post('/register', function (req, res, next) {
    userDao.register(req, res, next);
  });

  router.get('/query', function (req, res, next) {
    userDao.queryById(req, res, next);
  });

  router.get('/deleteUser', function (req, res, next) {
    userDao.delete(req, res, next);
  });

  router.post('/updateUser', function (req, res, next) {
    userDao.update(req, res, next);
  });

  router.post('/login', function (req, res, next) {
    userDao.login(req, res, next);
  });


  return router;
}
