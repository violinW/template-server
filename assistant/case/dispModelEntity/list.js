module.exports = (businessModel)=> {
    require('./codeTemplate/hotel_brand')(businessModel);
    require('./codeTemplate/hotel_store')(businessModel);
    require('./codeTemplate/operator')(businessModel);
    require('./codeTemplate/order')(businessModel);
    require('./codeTemplate/order_single_product')(businessModel);
    require('./codeTemplate/permission')(businessModel);
    require('./codeTemplate/product')(businessModel);
    require('./codeTemplate/unit')(businessModel);
}