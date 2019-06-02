var express = require('express');
var router = express.Router();
var dbName = require("../config/config.json").dbName;

module.exports = (Anne)=> {
    var orderDao = require('../dao/orderDao')(dbName, Anne);

// 订单列表
    router.get('/list/:hotelId', function (req, res, next) {
        orderDao.getOrderList(req, res, next);
    });

// 订单详情
    router.get('/detail/:orderId', function (req, res, next) {
        orderDao.orderDetail(req, res, next);
    });

// 订单新增
    router.post('/add', function (req, res, next) {
        orderDao.addOrder(req, res, next);
    });

// 订单编辑
    router.post('/edit/:orderId', function (req, res, next) {
        orderDao.editOrder(req, res, next);
    });

// 酒店门店删除
    router.post('/del/:orderId', function (req, res, next) {
        orderDao.deleteOrder(req, res, next);
    });

// 根据门店获取订单编号
    router.get('/number', function (req, res, next) {
        orderDao.getOrderNumberByHotelId(req, res, next);
    });

// 订单新增
    router.post('/signature/:orderId', function (req, res, next) {
        orderDao.orderSignature(req, res, next);
    });

// 订单新增
    router.post('/settlement', function (req, res, next) {
        orderDao.orderSettlement(req, res, next);
    });

// 订单新增
    router.post('/settlement/sure', function (req, res, next) {
        orderDao.orderSettlementSure(req, res, next);
    });


    return router;
}
