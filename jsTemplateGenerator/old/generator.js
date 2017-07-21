var fs = require('fs');

var codeTemplateStr = "./codeTemplate.txt";
var template = fs.readFileSync(codeTemplateStr, 'UTF-8');

var tableDefine = "./promotion/campaign.json";
var tableJSON = fs.readFileSync(tableDefine, 'UTF-8');

var data = JSON.parse(tableJSON);


//#%%#变量
//#!!#遍历


(function generateCode(codeTemplateStr, data) {
    console.log("GenerateCode BEGIN");
    console.log("\n");

    var code = replaceParams(codeTemplateStr, data);
    code = dealJudgment(code, data);
    code = dealTraversal(code, data);

    console.log(code);
    console.log("GenerateCode END");
})(template, data);

/**
 * 处理模板中的参数
 * @param codeTemplateStr 目标字符串
 * @param data 参数
 */
function replaceParams(codeTemplateStr, data) {
    var reg = /#%(\w+)%#/g;
    var code = codeTemplateStr.replace(reg, function () {
        return data[RegExp.$1];
    });

    return code;
}

/**
 * 处理判断条件
 * @param codeTemplateStr 目标字符串
 * @param data 参数
 */
function dealJudgment(codeTemplateStr, data) {
    var reg = /#\^@([a-zA-Z.]+)([=><]*)([0-9]*)@([\s\S]+?)\^#/g;
    var code = codeTemplateStr.replace(reg, function () {
        try {
            var result;
            if (RegExp.$2) {
                result = eval(recursiveJsonData(data, RegExp.$1.split('.')) + RegExp.$2 + RegExp.$3);
            } else {
                result = !!recursiveJsonData(data, RegExp.$1.split('.'));
            }

            return result ? RegExp.$4.trim() : "";
        }
        catch (err) {
            throw new Error("条件判断eval出错");
        }
    });
    return code;
}
/**
 * 处理遍历
 * @param codeTemplateStr
 * @param data
 */
function dealTraversal(codeTemplateStr, data) {
    var reg = /#!@(\w+)@([\s\S]+?)!#/g;
    var code = codeTemplateStr.replace(reg, function () {
        var body = RegExp.$2;
        var traversalData = data[RegExp.$1];
        var traversalCode = "";
        traversalData && traversalData.forEach(function (tData) {
            traversalCode += dealInnerParams(body, tData);
        });
        return traversalCode.trim();
    });

    return code;
}

/**
 * 处理循环体等内部的变量
 * @param codeTemplateStr
 * @param data
 */
function dealInnerParams(codeTemplateStr, data) {
    var traversalReg = /{{([\s\S]+?)}}/g;
    var code = codeTemplateStr.replace(traversalReg, function () {
        var paramName = RegExp.$1.replace('data.', '').split('.');
        var tt = recursiveJsonData(data, paramName);
        return tt;
    });
    return code;

}

/**
 * 递归获取json格式数据的某个子级结点，若有该结点，则返回结点数据，若无则返回undefined
 * @param data json数据
 * @param propertyName 子节点数组
 * @param depth 当前深度（一般不传）
 */
function recursiveJsonData(data, propertyName, depth) {
    depth = depth || 0;
    if (!data[propertyName[depth]]) {
        return undefined;
    } else if (propertyName.length > depth + 1) {
        return recursiveJsonData(data[propertyName[depth]], propertyName, ++depth)
    } else {
        return data[propertyName[depth]];
    }
}