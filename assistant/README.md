使用方法:

项目助手强依赖于knex,请将配置好数据库参数的knex当做项目助手的参数传入
同时还强依赖于express-business-model包,项目中请安装好该包

实例化一个项目助手:
const Assistent = require('../assistant/index')(knex);

查看版本号:
Assistent.version

查看描述:
Assistent.description

获取项目助手"Anne":
const Anne = Assistent.Anne;
Anne是项目助手的业务实体,Anne内置了管理公共方法、公共引用等的方法,Anne的更多内容会在后面进行说明

如何拓展Anne的方法:
Assistent.extend(methodName, methodBody)
methodName: 方法名
methodBody: 方法体
若与Anne内置的方法同名,则内置的方法会失效



##############################################


以下是关于Anne对象的说明:


Anne.CommonMethod   项目的公共方法的引用
Anne.DataStructure    项目的公共数据结构
Anne.CommonReferences     项目的公共三方包引用


