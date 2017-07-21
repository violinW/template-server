'use strict';
module.exports = (paths, _)=> {
    let methods = {};
    _.each(paths, (path, pathName)=> {
        methods[pathName] = require(path);
    });
    return methods;
};