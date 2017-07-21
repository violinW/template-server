module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "Default_Category",
    describe: "默认种类模型",
    structure: {
      "id": {
        "type": "int",
        "describe": "主键",
        "key": true,
        "mappingName": "id",
        "mappingType": "int",
        "defaultValue": dataType.int("1")
      },
      "name": {
        "type": "string",
        "describe": "种类名称",
        "mappingName": "name",
        "mappingType": "string",
        "defaultValue": dataType.string("列表")
      },
      "number": {
        "type": "string",
        "describe": "种类编号",
        "mappingName": "number",
        "mappingType": "string",
        "defaultValue": dataType.string("111111111")
      },
      "desc": {
        "type": "string",
        "describe": "描述",
        "mappingName": "desc",
        "mappingType": "string",
        "defaultValue": dataType.string("这是一个描述")
      }
    }
  });
}