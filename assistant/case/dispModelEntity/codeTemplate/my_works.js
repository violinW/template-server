module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "My_Works",
    describe: "我的作品模型",
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
      "works_UUID": {
        "type": "string",
        "describe": "作品Id",
        "mappingName": "works_UUID",
        "mappingType": "string",
        "defaultValue": dataType.string("123")
      }
    }
  });
}