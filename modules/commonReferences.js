'use strict';
const log4js = require('log4js');
const _ = require("lodash");
const knex = require('./db');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const logger = log4js.getLogger();
logger.level = 'debug';
module.exports = (businessModel)=>{
  return {
    logger: logger,
    knex,
    businessModel,
    _,
    jwt,
    config,
    bcrypt,  //加密算法
    Promise
  };
}