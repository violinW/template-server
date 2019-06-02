module.exports=(businessModel)=> {
    const {dataStructure, dataType} = businessModel;

    dataStructure.setModel({
        name: "Permission",
        describe: "权限列表",
        structure: {
            "id": {
                "type": "int",
                "describe": "主键",
                "key": true,
                "mappingName": "id",
                "mappingType": "int",
                "defaultValue": dataType.int("1")
            },
            "number": {
                "type": "string",
                "describe": "编号",
                "mappingName": "number",
                "mappingType": "string",
                "defaultValue": dataType.string("111111")
            },
            "permissionName": {
                "type": "string",
                "describe": "权限名称",
                "mappingName": "permissionName",
                "mappingType": "string",
                "defaultValue": dataType.string("开单权限")
            }
        }
    });
}