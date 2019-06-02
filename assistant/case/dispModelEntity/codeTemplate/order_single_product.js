module.exports=(businessModel)=> {
    const {dataStructure, dataType} = businessModel;

    dataStructure.setModel({
        name: "Order_Single_Product",
        describe: "订单单品列表",
        structure: {
            "id": {
                "type": "int",
                "describe": "主键",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "productNo": {
                "type": "string",
                "describe": "单品Id",
                "mappingName": "productNo",
                "mappingType": "string",
                "defaultValue": dataType.string("111111")
            },
            "orderId": {
                "type": "int",
                "describe": "订单Id",
                "mappingName": "orderId",
                "mappingType": "int",
                "defaultValue": dataType.int("111111")
            },
            "purchasePrice": {
                "type": "int",
                "describe": "进价",
                "mappingName": "purchasePrice",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "sellingPrice": {
                "type": "int",
                "describe": "售价",
                "mappingName": "sellingPrice",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "quantity": {
                "type": "int",
                "describe": "数量",
                "mappingName": "quantity",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "unitId": {
                "type": "int",
                "describe": "单位Id",
                "mappingName": "unitId",
                "mappingType": "int",
                "defaultValue": dataType.int("0")
            },
            "remark": {
                "type": "int",
                "describe": "备注",
                "mappingName": "remark",
                "mappingType": "int",
                "defaultValue": dataType.int("0")
            }
        }
    });
}