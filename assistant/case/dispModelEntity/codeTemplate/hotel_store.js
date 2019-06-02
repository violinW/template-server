module.exports=(businessModel)=> {
    const {dataStructure, dataType} = businessModel;

    dataStructure.setModel({
        name: "Hotel_Store",
        describe: "酒店门店列表",
        structure: {
            "id": {
                "type": "int",
                "describe": "主键",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "brand_id": {
                "type": "int",
                "describe": "酒店品牌Id",
                "mappingName": "brandId",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "hotel_store_name": {
                "type": "string",
                "describe": "酒店门店名称",
                "mappingName": "hotelStoreName",
                "mappingType": "string",
                "defaultValue": dataType.string("汉庭酒店1号店")
            }
        }
    });
}