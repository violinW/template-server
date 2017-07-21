'use strict';

const structure =(businessModel)=>{
    require('./enum/enumDefinition.js')(businessModel.dataType.enumExtend);
    return {
        dataType: businessModel.dataType
    };
}

module.exports = structure;