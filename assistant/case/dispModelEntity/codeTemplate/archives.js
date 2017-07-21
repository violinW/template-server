module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "Archives",
    describe: "归档表模型",
    structure: {
      "id": {
        "type": "int",
        "describe": "主键",
        "key": true,
        "mappingName": "id",
        "mappingType": "int",
        "defaultValue": dataType.int("1")
      },
      "author_id": {
        "type": "string",
        "describe": "作者Id",
        "mappingName": "author_id",
        "mappingType": "string",
        "defaultValue": dataType.string("324353")
      },
      "author_name": {
        "type": "string",
        "describe": "作者名称",
        "mappingName": "author_name",
        "mappingType": "string",
        "defaultValue": dataType.string("张三")
      },
      "work_id": {
        "type": "string",
        "describe": "作品Id",
        "mappingName": "work_id",
        "mappingType": "string",
        "defaultValue": dataType.string("322")
      },
      "work_name": {
        "type": "string",
        "describe": "作品名称",
        "mappingName": "work_name",
        "mappingType": "string",
        "defaultValue": dataType.string("狂拽炫酷")
      },
      "work_desc": {
        "type": "string",
        "describe": "作品描述",
        "mappingName": "work_desc",
        "mappingType": "string",
        "defaultValue": dataType.string("这是一条描述")
      },
      "work_create_time": {
        "type": "time",
        "describe": "作品创建时间",
        "mappingName": "work_create_time",
        "mappingType": "string",
        "defaultValue": dataType.time("2017-07-12 00:00:00")
      }
    }
  });
}