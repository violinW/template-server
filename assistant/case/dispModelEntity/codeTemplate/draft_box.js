module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "Draft_Box",
    describe: "草稿箱模型",
    structure: {
      "id": {
        "type": "int",
        "describe": "主键",
        "key": true,
        "mappingName": "id",
        "mappingType": "int",
        "defaultValue": dataType.int("1")
      },
      "work_name": {
        "type": "string",
        "describe": "作品名称",
        "mappingName": "work_name",
        "mappingType": "string",
        "defaultValue": dataType.string("狂拽炫酷")
      },
      "save_time": {
        "type": "time",
        "describe": "保存时间",
        "mappingName": "save_time",
        "mappingType": "string",
        "defaultValue": dataType.time("2017-07-12")
      },
      "template": {
        "type": "string",
        "describe": "模板",
        "mappingName": "template",
        "mappingType": "string",
        "defaultValue": dataType.string("模板")
      },
      "css": {
        "type": "string",
        "describe": "样式",
        "mappingName": "css",
        "mappingType": "string",
        "defaultValue": dataType.string("样式")
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