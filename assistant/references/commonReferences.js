'use strict';
const Logger = require('logger-romens');
const _ = require("lodash");
const knex = require('../../modules/db');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const bcrypt = require('bcrypt');

module.exports = (businessModel)=>{
  require("../case/dispModelEntity/list.js")(businessModel);
  return {
    logger: new Logger(),
    knex: knex,
    businessModel: businessModel,
    _: _,
    jwt: jwt,
    config: config,
    bcrypt: bcrypt  //加密算法
  };
}