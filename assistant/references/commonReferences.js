'use strict';

module.exports = (path, businessModel)=> {
  require("../case/dispModelEntity/list.js")(businessModel);
  return require(path)(businessModel);
};