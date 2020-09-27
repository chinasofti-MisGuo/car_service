/**
 @Name：  统计
 @Author：Yu.Guo
 */

layui.define(['table', 'form'], function (exports) {
    var $ = layui.$,
        admin = layui.admin,
        view = layui.view,
        table = layui.table,
        form = layui.form;

    table.render({
        elem: '#LAY-storeList-manage',
        url: layui.setter.ajaxUrl + '/api/admin/banner/list',
        method: 'get',
        cols: [[
            {type: 'numbers', title: '序号', align: 'center'},
            {field: 'imgName', title: '人员姓名',  align: 'center'},
            {field: 'imgName', title: '已交付部件数', align: 'center'},
            {field: 'imgName', title: '内返工部件数',  align: 'center'},
            {field: 'imgName', title: '外返工部件数', align: 'center'},
            {field: 'imgName', title: '修复失败部件数',  align: 'center'}
        ]],
        page: true,
        text: {
            none: '暂无数据',
            error: '对不起，加载出现异常！'
        },
        done: function (data) {
            if (data.code == 403) {
                layer.closeAll();
                admin.exit();
                setTimeout(function () {
                    layer.alert('此账号已在别处登录,请重新登录！', {
                        icon: 5
                    });
                }, 666);
            }
        }
    });


    table.render({
        elem: '#LAY-pla-manage',
        url: layui.setter.ajaxUrl + '/api/admin/banner/list',
        method: 'get',
        cols: [[
            {type: 'numbers', title: '序号', align: 'center'},
            {field: 'imgName', title: '门店名称',  align: 'center'},
            {field: 'imgName', title: '已交付部件数', align: 'center'},
            {field: 'imgName', title: '内返工部件数',  align: 'center'},
            {field: 'imgName', title: '外返工部件数', align: 'center'},
            {field: 'imgName', title: '修复失败部件数',  align: 'center'}
        ]],
        page: true,
        text: {
            none: '暂无数据',
            error: '对不起，加载出现异常！'
        },
        done: function (data) {
            if (data.code == 403) {
                layer.closeAll();
                admin.exit();
                setTimeout(function () {
                    layer.alert('此账号已在别处登录,请重新登录！', {
                        icon: 5
                    });
                }, 666);
            }
        }
    });

    table.render({
        elem: '#LAY-view-manage',
        url: layui.setter.ajaxUrl + '/api/admin/banner/list',
        method: 'get',
        cols: [[
            {type: 'numbers', title: '序号', align: 'center'},
            {field: 'imgName', title: '内返比例',  align: 'center'},
            {field: 'imgName', title: '外返比例', align: 'center'}
        ]],
        page: true,
        text: {
            none: '暂无数据',
            error: '对不起，加载出现异常！'
        },
        done: function (data) {
            if (data.code == 403) {
                layer.closeAll();
                admin.exit();
                setTimeout(function () {
                    layer.alert('此账号已在别处登录,请重新登录！', {
                        icon: 5
                    });
                }, 666);
            }
        }
    });


    exports('statistics', {})
});