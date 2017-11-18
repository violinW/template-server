'use strict';
const Logger = require('log4js');
const _ = require("lodash");
const knex = require('./db');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');

module.exports = (businessModel)=>{
  return {
    logger: Logger.getLogger(),
    knex,
    businessModel,
    _,
    jwt,
    config,
    bcrypt,  //加密算法
    Promise
  };
}