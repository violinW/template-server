'use strict';

const version = "0.0.1";
const description = "我是项目助手，帮助整合项目资源";
const config = require('./config.json');

const knex = require('../modules/db');
//const businessModel = require("icrm-business-model");
const modelList = require("./case/modelEntity/modelList.js");
const businessModel = require("../jsTemplateGenerator/new/businessModel/index.js")(knex, modelList);

//公共方法的存放路径
const commonMethodPath = config.commonMethodPath;
//数据结构存放路径
const structure = require("./structure/structure")(businessModel);
const references = require("./references/commonReferences")(businessModel);

const _ = require('lodash');

const commonMethod = require("./method/commonMethod")(commonMethodPath, _);

function Assistant() {
  this.version = version;
  this.description = description;
  this.extend = (methodName, methodBody)=> {
    this.Anne[methodName] = methodBody;
  };
}

Assistant.prototype.getBasicConfig = {
  commonMethodPath,
  DataStructure: structure
};

Assistant.prototype.Anne = {
  CommonMethod: commonMethod,
  DataStructure: structure,
  CommonReferences: references
};
module.exports = new Assistant();