module.exports=(businessModel)=> {
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "Login_Log",
    describe: "登陆记录模型",
    structure: {
      "id": {
        "type": "int",
        "describe": "主键",
        "key": true,
        "mappingName": "id",
        "mappingType": "int",
        "defaultValue": dataType.int("1")
      },
      "login_time": {
        "type": "time",
        "describe": "登陆时间",
        "mappingName": "login_time",
        "mappingType": "string",
        "defaultValue": dataType.time("2017-07-12")
      },
      "login_ip": {
        "type": "string",
        "describe": "登陆IP",
        "mappingName": "login_ip",
        "mappingType": "string",
        "defaultValue": dataType.string("127.0.0.1")
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