module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "Category",
    describe: "种类模型",
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
        "defaultValue": dataType.time("列表")
      },
      "number": {
        "type": "string",
        "describe": "种类编号",
        "mappingName": "number",
        "mappingType": "string",
        "defaultValue": dataType.string("111111111")
      },
      "type": {
        "type": "string",
        "describe": "类型",
        "mappingName": "type",
        "mappingType": "enum|category_type",
        "defaultValue": dataType.enum("category_type").convertToValue('default')
      },
      "user_UUID": {
        "type": "string",
        "describe": "用户ID",
        "mappingName": "user_UUID",
        "mappingType": "string",
        "defaultValue": dataType.string("0000001")
      }
    }
  });
}