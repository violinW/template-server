'use strict'
var config = require('../config/config.json');
var dbConfig = config.mysql;
var debugMode = config.debugMode;
var knex = require('knex');
module.exports = knex({
  client: 'mysql',
  connection: {
    host : dbConfig.host,
    user : dbConfig.user,
    password : dbConfig.password,
    supportBigNumbers: dbConfig.supportBigNumbers,
    bigNumberStrings: dbConfig.bigNumberStrings
  },
  pool: { min: 0, max: 10 },
  debug:debugMode
});