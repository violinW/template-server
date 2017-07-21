/*****************************************************************
 * 青岛雨人软件有限公司©2016版权所有
 *
 * 本软件之所有（包括但不限于）源代码、设计图、效果图、动画、日志、
 * 脚本、数据库、文档均为青岛雨人软件或其附属子公司所有。任何组织
 * 或者个人，未经青岛雨人软件书面授权，不得复制、使用、修改、分发、
 * 公布本软件的任何部分。青岛雨人软件有限公司保留对任何违反本声明
 * 的组织和个人采取法律手段维护合法权益的权利。
 *****************************************************************/
'use strict';
module.exports = (enumExtend)=> {

    enumExtend("sex", {
        name: "sex",
        describe: "性别",
        value: {
            "male": "男",
            "female": "女"
        }
    });

    enumExtend("user_status", {
        name: "user_status",
        describe: "用户状态",
        value: {
            "default": "默认类型(正常状态)",
            "freeze": "已冻结",
            "cancel": "已注销"
        }
    });

    enumExtend("category_type", {
        name: "category_type",
        describe: "品类类型",
        value: {
            "default": "默认类型(正常状态)",
            "freeze": "已冻结"
        }
    });

    enumExtend("works_type", {
        name: "works_type",
        describe: "作品类型",
        value: {
            "system": "系统类型",
            "public": "公开类型",
            "private": "私有类型"
        }
    });

    enumExtend("works_status", {
        name: "works_status",
        describe: "作品状态",
        value: {
            "default": "默认类型(正常状态)",
            "freeze": "已冻结"
        }
    });
}