{
    "code": 200,
    "msg": "success",
    "data": [{
        "name": "service_store",
        "title": "服务门店管理(平台)",
        "icon": "layui-icon-print",
        "list": [{
            "name": "service_store",
            "title": "门店列表",
            "jump": "serviceStore/list"
        }]
    }, {
        "title": "基础设置(平台)",
        "icon": "layui-icon-set",
        "list": [{
            "title": "施工类型管理",
            "jump": "set/applyType"
        }, {
            "title": "返工原因设置",
            "jump": "set/reworkReason"
        }, {
            "title": "维修时间",
            "jump": "set/repairTime"
        }, {
            "title": "协议管理",
            "jump": "set/agreement"
        }]
    }, {
        "title": "轮播图管理",
        "icon": "layui-icon-carousel",
        "list": [{
            "title": "轮播图列表",
            "jump": "banner/list"
        }]
    }, {
        "name": "adminauth",
        "title": "权限管理",
        "icon": "layui-icon-console",
        "list": [{
            "name": "adminauth",
            "title": "管理员管理",
            "jump": "adminauth/adminuser/list"
        }, {
            "name": "adminauth",
            "title": "角色管理",
            "jump": "adminauth/role/list"
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