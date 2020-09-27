/**
 @Name：  基础设置相关
 @Author：Yu.Guo
 */

layui.define(['table', 'form'], function (exports) {
    var $ = layui.$,
        admin = layui.admin,
        view = layui.view,
        table = layui.table,
        form = layui.form;

    /*列表*/
    table.render({
        elem: '#LAY-set-manage',
        url: layui.setter.ajaxUrl + '/api/admin/cloud/report/list',
        method: 'get',
        cols: [
            [{
                type: 'checkbox'
            }, {
                type: 'numbers',
                title: '序号',
                align: 'center'
            }, {
                field: 'storeName',
                title: '门店名称',
                align: 'center'
            }, {
                field: 'fullName',
                title: '负责人姓名',
                align: 'center'
            }, {
                field: 'day',
                title: '距离到期(天)',
                align: 'center'
            }]
        ],
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

    exports('set', {})
});