module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "Css",
    describe: "样式表模型",
    structure: {
      "id": {
        "type": "int",
        "describe": "主键",
        "key": true,
        "mappingName": "id",
        "mappingType": "int",
        "defaultValue": dataType.int("1")
      },
      "body": {
        "type": "string",
        "describe": "样式内容",
        "mappingName": "body",
        "mappingType": "string",
        "defaultValue": dataType.string("样式")
      }
    }
  });
}