module.exports=(businessModel)=> {
    const {dataStructure, dataType} = businessModel;

    dataStructure.setModel({
        name: "Product",
        describe: "商品列表",
        structure: {
            "id": {
                "type": "int",
                "describe": "主键",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "number": {
                "type": "string",
                "describe": "单品编号",
                "mappingName": "number",
                "mappingType": "string",
                "defaultValue": dataType.string("111111")
            },
            "productName": {
                "type": "string",
                "describe": "单品名称",
                "mappingName": "productName",
                "mappingType": "string",
                "defaultValue": dataType.string("苹果")
            },
            "mnemonicCode": {
                "type": "string",
                "describe": "助记码",
                "mappingName": "mnemonicCode",
                "mappingType": "string",
                "defaultValue": dataType.string("PG")
            }
        }
    });
}