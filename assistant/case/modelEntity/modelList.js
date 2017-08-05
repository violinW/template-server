'use strict';
const user_model = require("./codeTemplate/user.json");
const works_model = require("./codeTemplate/works.json");
const works_default_model = require("./codeTemplate/works_default.json");

module.exports = {
  User: user_model,
  Works: works_model,
  DefaultCategory: works_default_model
};