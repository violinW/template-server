'use strict';
module.exports = (dbName, Anne)=> {
    const {businessModel, logger} = Anne.CommonReferences;
    const {CommonUseCase, dataStructure} = businessModel;

    return {
        getDefaultData(req, res, next) {
            const name = req.query.name;
            const dealData = dataStructure.getModel(name).getDefaultData();
            res.send(dealData);
        }
    }
}