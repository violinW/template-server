module.exports=(businessModel)=> {
    const {dataStructure, dataType} = businessModel;

    dataStructure.setModel({
        name: "Unit",
        describe: "单位列表",
        structure: {
            "id": {
                "type": "int",
                "describe": "主键",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "unitName": {
                "type": "string",
                "describe": "单位名称",
                "mappingName": "unitName",
                "mappingType": "string",
                "defaultValue": dataType.string("件")
            }
        }
    });
}