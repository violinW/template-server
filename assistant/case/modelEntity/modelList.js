'use strict';
const user_model = require("./codeTemplate/user.json");
const works_model = require("./codeTemplate/works.json");
const default_category_model = require("./codeTemplate/default_category.json");
const draft_model = require("./codeTemplate/draft.json");
const my_works_model = require("./codeTemplate/my_works.json");

module.exports = {
  User: user_model,
  Works: works_model,
  DefaultCategory: default_category_model,
  Draft: draft_model,
  MyWorks: my_works_model
};