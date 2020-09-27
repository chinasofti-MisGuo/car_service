{
    "code" : 200
    ,"msg" : "success"
    ,"data":
    [{
        "name": "service_store"
        , "title": "服务门店管理(平台)"
        , "icon": "layui-icon-print"
        , "list": [ {
            "name": "service_store"
            , "title": "门店列表"
            , "jump": "serviceStore/list"
        }]
    }, {
        "title": "基础设置(平台)"
        , "icon": "layui-icon-set"
        , "list": [{
            "title": "用户协议管理"
            , "jump": "set/user_rule"
        },{
            "title": "关于我们"
            , "jump": "set/about_us"
        },{
            "title": "门店到期提醒列表"
            , "jump": "set/store_list"
        },{
            "title": "二维码管理"
            , "jump": "set/or_code"
        }]
    } , {
        "name": "adminauth"
        , "title": "权限管理"
        , "icon": "layui-icon-console"
        , "list": [{
            "name": "adminauth"
            , "title": "管理员管理"
            , "jump": "adminauth/adminuser/list"
        }, {
            "name": "adminauth"
            , "title": "角色管理"
            , "jump": "adminauth/role/list"
        }]
    }, {
        "name": "order"
        , "title": "订单管理"
        , "icon": "layui-icon-cols"
        , "list": [{
            "name": "order_list"
            , "title": "订单列表"
            , "jump": "order/order_list"
        }]
    }, {
        "name": "output_value"
        , "title": "产值管理(平台、门店)"
        , "icon": "layui-icon-template-1"
        , "list": [{
            "name": "sum_value"
            , "title": "总产值"
            , "jump": "value/sum_list"
        },{
            "name": "p_value"
            , "title": "个人产值"
            , "jump": "value/person_list"
        }]
    }, {
        "name": "Statistics"
        , "title": "统计(平台、门店)"
        , "icon": "layui-icon-survey"
        , "list": [{
            "name": "tongji"
            , "title": "列表(门店查询)"
            , "jump": "statistics/storeList"
        },{
            "name": "p_value"
            , "title": "列表(平台查询)"
            , "jump": "statistics/plaList"
        },{
            "name": "p_value"
            , "title": "可视化展示"
            , "jump": "statistics/view"
        }]
    }, {
        "name": "store",
        "title": "信息管理(门店)",
        "icon": "layui-icon-cols",
        "list": [{
            "name": "store",
            "title": "信息管理",
            "jump": "store/admin"
        }]
    }, {
        "name": "adminauth",
        "title": "合作商管理(门店)",
        "icon": "layui-icon-group",
        "list": [{
            "name": "official_partner",
            "title": "合作商管理",
            "jump": "officialPartner/admin"
        }]
    }, {
        "name": "adminauth",
        "title": "人员管理(门店)",
        "icon": "layui-icon-component",
        "list": [{
            "name": "staff",
            "title": "人员管理",
            "jump": "staff/admin"
        }]
    }]
}




