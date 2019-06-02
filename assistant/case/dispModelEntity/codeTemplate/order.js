module.exports=(businessModel)=> {
    const {dataStructure, dataType} = businessModel;

    dataStructure.setModel({
        name: "Order",
        describe: "订单列表",
        structure: {
            "id": {
                "type": "int",
                "describe": "主键",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "storeId": {
                "type": "int",
                "describe": "门店Id",
                "mappingName": "storeId",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "number": {
                "type": "string",
                "mappingName": "number",
                "mappingType": "string",
                "defaultValue": dataType.string("111111")
            },
            "datetime": {
                "type": "time",
                "describe": "开单日期",
                "mappingName": "datetime",
                "mappingType": "string",
                "defaultValue": dataType.time("2019-04-12")
            },
            "operatorId": {
                "type": "int",
                "describe": "操作员Id",
                "mappingName": "operatorId",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "orderTotal": {
                "type": "int",
                "describe": "总计",
                "mappingName": "orderTotal",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "remarkTotal": {
                "type": "int",
                "describe": "备注后总计",
                "mappingName": "remarkTotal",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "settlement": {
                "type": "int",
                "describe": "是否结算",
                "mappingName": "settlement",
                "mappingType": "int",
                "defaultValue": dataType.int("0")
            },
            "obsolete": {
                "type": "int",
                "describe": "是否作废",
                "mappingName": "obsolete",
                "mappingType": "int",
                "defaultValue": dataType.int("0")
            },
            "signature": {
                "type": "string",
                "describe": "签名",
                "mappingName": "signature",
                "mappingType": "string",
                "defaultValue": dataType.string("签名")
            },
        }
    });
}