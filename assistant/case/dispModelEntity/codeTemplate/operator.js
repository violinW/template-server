module.exports=(businessModel)=> {
    const {dataStructure, dataType} = businessModel;

    dataStructure.setModel({
        name: "Operator",
        describe: "操作员列表",
        structure: {
            "id": {
                "type": "int",
                "describe": "主键",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "operatorName": {
                "type": "string",
                "describe": "操作员名称",
                "mappingName": "operatorName",
                "mappingType": "string",
                "defaultValue": dataType.string("张三")
            },
            "password": {
                "type": "string",
                "describe": "密码",
                "mappingName": "password",
                "mappingType": "string",
                "defaultValue": dataType.string("123456")
            },
            "permissionNumbers": {
                "type": "string",
                "describe": "权限编码列表",
                "mappingName": "permissionNumbers",
                "mappingType": "string",
                "defaultValue": dataType.string("01,02,03")
            }
        }
    });
}