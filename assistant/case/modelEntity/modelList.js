'use strict';
const hotel_brand = require("./codeTemplate/hotel_brand.json");
const hotel_store = require("./codeTemplate/hotel_store.json");
const operator = require("./codeTemplate/operator.json");
const order = require("./codeTemplate/order.json");
const order_singel_product = require("./codeTemplate/order_single_product.json");
const permission = require("./codeTemplate/permission.json");
const product = require("./codeTemplate/product.json");
const unit = require("./codeTemplate/unit.json");

module.exports = {
    HotelBrand: hotel_brand,
    HotelStore: hotel_store,
    Order: order,
    OrderSingelProduct: order_singel_product,
    Permission: permission,
    Product: product,
    Unit: unit,
    Operator: operator
};