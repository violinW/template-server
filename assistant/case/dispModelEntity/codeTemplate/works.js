module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "Works",
    describe: "作品表模型",
    structure: {
      "UUID": {
        "type": "string",
        "describe": "逻辑主键",
        "key": true,
        "mappingName": "GUID",
        "mappingType": "string",
        "defaultValue": dataType.string("0000001")
      },
      "name": {
        "type": "string",
        "describe": "名称",
        "mappingName": "name",
        "mappingType": "string",
        "defaultValue": dataType.string("狂拽炫酷")
      },
      "create_time": {
        "type": "time",
        "describe": "创建时间",
        "mappingName": "create_time",
        "mappingType": "string",
        "defaultValue": dataType.time("2017-07-12 00:00:00")
      },
      "type": {
        "type": "string",
        "describe": "类型",
        "mappingName": "type",
        "mappingType": "enum|works_type",
        "defaultValue": dataType.enum("works_type").convertToValue('system')
      },
      "status": {
        "type": "string",
        "describe": "类型",
        "mappingName": "status",
        "mappingType": "enum|works_status",
        "defaultValue": dataType.enum("works_status").convertToValue('default')
      },
      "desc": {
        "type": "string",
        "describe": "描述",
        "mappingName": "desc",
        "mappingType": "string",
        "defaultValue": dataType.string("这是一个描述")
      },
      "collectors": {
        "type": "int",
        "describe": "收藏人数",
        "mappingName": "collectors",
        "mappingType": "int",
        "defaultValue": dataType.int("4")
      },
      "pageviews": {
        "type": "int",
        "describe": "浏览次数",
        "mappingName": "pageviews",
        "mappingType": "int",
        "defaultValue": dataType.int("5")
      },
      "update_time": {
        "type": "time",
        "describe": "更新时间",
        "mappingName": "update_time",
        "mappingType": "string",
        "defaultValue": dataType.time("2017-07-12 00:00:00")
      },
      "template_id": {
        "type": "string",
        "describe": "模板Id",
        "mappingName": "template_id",
        "mappingType": "string",
        "defaultValue": dataType.string("123")
      },
      "css_id": {
        "type": "string",
        "describe": "样式Id",
        "mappingName": "css_id",
        "mappingType": "string",
        "defaultValue": dataType.string("321")
      }
    }
  });
}