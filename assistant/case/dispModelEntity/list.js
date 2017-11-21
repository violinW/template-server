module.exports = (businessModel)=> {
    require('./codeTemplate/archives')(businessModel);
    require('./codeTemplate/category')(businessModel);
    require('./codeTemplate/collection')(businessModel);
    require('./codeTemplate/css')(businessModel);
    require('./codeTemplate/default_category')(businessModel);
    require('./codeTemplate/draft_box')(businessModel);
    require('./codeTemplate/login_log')(businessModel);
    require('./codeTemplate/my_works')(businessModel);
    require('./codeTemplate/template')(businessModel);
    require('./codeTemplate/user')(businessModel);
    require('./codeTemplate/works')(businessModel);
    require('./codeTemplate/params')(businessModel);
}