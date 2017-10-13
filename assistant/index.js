'use strict';
/**
 * 项目助手强依赖于knex包,请配置好knex包之后当做参数传入
 * @param knex
 * @returns {Assistant}
 */
module.exports = (knex)=> {
  const version = "0.0.1";
  const description = "我是项目助手，帮助整合项目资源";
  const config = require('./config.json');

  const modelList = require("./case/modelEntity/modelList.js");
  const businessModel = require("express-business-model")(knex, modelList);

//公共方法的存放路径
  const commonMethodPath = config.commonMethodPath;
//公共引用的存放路径
  const commonReferences = config.commonReferences;
//数据结构存放路径
  const structure = require("./structure/structure")(businessModel);
  const references = require("./references/commonReferences")(commonReferences, businessModel);

  const _ = require('lodash');

  const commonMethod = require("./method/commonMethod")(commonMethodPath, _);

  /**
   * 项目助手类
   * @constructor
   */
  function Assistant() {
    //版本
    this.version = version;
    //描述
    this.description = description;
    //拓展方法
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
  return new Assistant();
}