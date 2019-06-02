var express = require('express');
var router = express.Router();
var dbName = require("../config/config.json").dbName;

module.exports = (Anne)=> {
    var userDao = require('../dao/userDao')(dbName, Anne);

    // 增加用户
    router.post('/register', function (req, res, next) {
        userDao.newUser(req, res, next);
    });

    router.get('/delOperator', function (req, res, next) {
        userDao.delete(req, res, next);
    });

    router.get('/getOperatorList', function (req, res, next) {
        userDao.getOperatorList(req, res, next);
    });

    router.post('/updateOperator', function (req, res, next) {
        userDao.update(req, res, next);
    });

    router.post('/login', function (req, res, next) {
        userDao.login(req, res, next);
    });


    return router;
}
