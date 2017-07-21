module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "Collection",
    describe: "用户收藏表模型",
    structure: {
      "id": {
        "type": "int",
        "describe": "主键",
        "key": true,
        "mappingName": "id",
        "mappingType": "int",
        "defaultValue": dataType.int("1")
      },
      "user_UUID": {
        "type": "string",
        "describe": "用户Id",
        "mappingName": "user_UUID",
        "mappingType": "string",
        "defaultValue": dataType.string("0000001")
      },
      "template_id": {
        "type": "string",
        "describe": "模板Id",
        "mappingName": "template_id",
        "mappingType": "string",
        "defaultValue": dataType.string("123")
      }
    }
  });
}