module.exports=(businessModel)=> {
    const {dataStructure, dataType} = businessModel;

    dataStructure.setModel({
        name: "Hotel_Brand",
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
            "hotel_brand_name": {
                "type": "string",
                "describe": "酒店品牌名称",
                "mappingName": "hotelBrandName",
                "mappingType": "string",
                "defaultValue": dataType.string("汉庭酒店")
            }
        }
    });
}