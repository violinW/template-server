var express = require('express');
var router = express.Router();
var dbName = require("../config/config.json").dbName;

module.exports = (Anne)=> {
    var productDao = require('../dao/productDao')(dbName, Anne);
    var unitDao = require('../dao/unitDao')(dbName, Anne);
    var userDao = require('../dao/userDao')(dbName, Anne);

//　单品列表
    router.get('/product/list', function (req, res, next) {
        productDao.getList(req, res, next);
    });

//　单品列表
    router.get('/product/kwdlist', function (req, res, next) {
        productDao.getListByKeywords(req, res, next);
    });

//　新增单品
    router.post('/product/add', function (req, res, next) {
        productDao.addProduct(req, res, next);
    });

//　删除单品
    router.post('/product/del/:productId', function (req, res, next) {
        productDao.deleteProduct(req, res, next);
    });

//　单位列表
    router.get('/unit/list', function (req, res, next) {
        unitDao.getList(req, res, next);
    });

//　新增单位
    router.post('/unit/add', function (req, res, next) {
        unitDao.addUnit(req, res, next);
    });

//　删除单位
    router.post('/unit/del/:unitId', function (req, res, next) {
        unitDao.deleteUnit(req, res, next);
    });

//　配送员列表
    router.get('/operator/list', function (req, res, next) {
        userDao.getOperatorList(req, res, next);
    });

//　新增配送员
    router.post('/operator/add', function (req, res, next) {
        userDao.newUser(req, res, next);
    });

//　删除配送员
    router.post('/operator/del/:userId', function (req, res, next) {
        userDao.delete(req, res, next);
    });

    return router;
}
