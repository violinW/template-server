var express = require('express');
var router = express.Router();
var dbName = require("../config/config.json").dbName;

module.exports = (Anne)=> {
    var hotelDao = require('../dao/hotelDao')(dbName, Anne);

// 酒店品牌列表
    router.get('/brand/list', function (req, res, next) {
        hotelDao.getBrandList(req, res, next);
    });

// 酒店品牌新增
    router.post('/brand/add', function (req, res, next) {
        hotelDao.addHotelBrand(req, res, next);
    });

// 酒店品牌删除
    router.post('/brand/del/:brandId', function (req, res, next) {
        hotelDao.deleteHotelBrand(req, res, next);
    });

// 所有酒店门店列表
    router.get('/store/list/all', function (req, res, next) {
        hotelDao.getStoreAllList(req, res, next);
    });

// 酒店门店列表
    router.get('/store/list/:brandId', function (req, res, next) {
        hotelDao.getStoreList(req, res, next);
    });

// 酒店门店详情
    router.get('/store/detail/:hotelId', function (req, res, next) {
        hotelDao.getStoreDetail(req, res, next);
    });

// 酒店门店新增
    router.post('/store/add', function (req, res, next) {
        hotelDao.addStore(req, res, next);
    });

// 酒店门店删除
    router.post('/store/del/:hotelId', function (req, res, next) {
        hotelDao.deleteStore(req, res, next);
    });

    return router;
}
