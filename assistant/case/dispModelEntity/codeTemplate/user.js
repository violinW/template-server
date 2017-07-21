module.exports=(businessModel)=>{
  const {dataStructure, dataType} = businessModel;

  dataStructure.setModel({
    name: "User_Password_Update",
    describe: "用户密码模型",
    structure: {
      "UUID": {
        "type": "string",
        "describe": "逻辑主键",
        "key": true,
        "mappingName": "GUID",
        "mappingType": "string",
        "defaultValue": dataType.string("0000001")
      },
      "password": {
        "type": "string",
        "describe": "密码",
        "mappingName": "password",
        "mappingType": "string",
        "defaultValue": dataType.string("violin")
      }
    }
  });

  dataStructure.setModel({
    name: "User_Basic_Info",
    describe: "用户基础信息模型",
    structure: {
      "user_number": {
        "type": "string",
        "describe": "用户编号",
        "mappingName": "userNumber",
        "mappingType": "string",
        "defaultValue": dataType.string("1111111")
      },
      "nickname": {
        "type": "string",
        "describe": "昵称",
        "mappingName": "nickname",
        "mappingType": "string",
        "defaultValue": dataType.string("张三")
      },
      "sex": {
        "type": "string",
        "describe": "性别",
        "mappingName": "sex",
        "mappingType": "enum|sex",
        "defaultValue": dataType.enum("sex").convertToKey('男')
      },
      "birthday": {
        "type": "string",
        "describe": "生日",
        "mappingName": "birthday",
        "mappingType": "string",
        "defaultValue": "2017-07-12"
      },
      "phone": {
        "type": "string",
        "describe": "电话",
        "mappingName": "phone",
        "mappingType": "string",
        "defaultValue": dataType.string("130000000000")
      },
      "email": {
        "type": "string",
        "describe": "邮箱",
        "mappingName": "email",
        "mappingType": "string",
        "defaultValue": dataType.string("130@qq.com")
      },
      "address": {
        "type": "string",
        "describe": "地址",
        "mappingName": "address",
        "mappingType": "string",
        "defaultValue": dataType.string("地球上")
      },
      "status": {
        "type": "string",
        "describe": "状态",
        "mappingName": "status",
        "mappingType": "enum|user_status",
        "defaultValue": dataType.enum("user_status").convertToKey('默认类型(正常状态)')
      },
      "register_time": {
        "type": "time",
        "describe": "注册时间",
        "mappingName": "register_time",
        "mappingType": "string",
        "defaultValue": "2017-07-12 00:00:00"
      }
    }
  }).inheritOrganizer([dataStructure.getModel("User_Password_Update")]);

  dataStructure.setModel({
    name: "User_Extend_Info",
    describe: "用户拓展信息模型",
    structure: {
      "register_ip": {
        "type": "string",
        "describe": "注册IP",
        "mappingName": "register_ip",
        "mappingType": "string",
        "defaultValue": dataType.string("127.0.0.1")
      },
      "last_login_time": {
        "type": "time",
        "describe": "最后登陆时间",
        "mappingName": "last_login_time",
        "mappingType": "string",
        "defaultValue": "2017-07-12 00:00:00"
      },
      "last_login_ip": {
        "type": "string",
        "describe": "最后登陆IP",
        "mappingName": "last_login_ip",
        "mappingType": "string",
        "defaultValue": dataType.string("127.0.0.12")
      },
      "update_time": {
        "type": "time",
        "describe": "更新时间",
        "mappingName": "update_time",
        "mappingType": "string",
        "defaultValue": "2017-07-12 00:00:00"
      }
    }
  }).inheritOrganizer([dataStructure.getModel("User_Basic_Info")]);
}