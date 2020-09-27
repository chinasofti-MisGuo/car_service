/**
 @Name：  产值管理
 @Author：Yu.Guo
 */

layui.define(['table', 'form'], function (exports) {
    var $ = layui.$,
        admin = layui.admin,
        view = layui.view,
        table = layui.table,
        form = layui.form;

    table.render({
        elem: '#LAY-value-manage',
        url: layui.setter.ajaxUrl + '/api/admin/banner/list',
        method: 'get',
        cols: [[
            {type: 'checkbox', rowspan: 2},
            {type: 'numbers', title: '序号', rowspan: 2, align: 'center'},
            {field: 'imgName', title: '门店名称', rowspan: 2, align: 'center'},
            {field: 'imgName', title: '门店人员总数', rowspan: 2, align: 'center'},
            {align: 'center', title: '订单数', colspan: 4},
            {field: 'imgName', title: '订单金额', rowspan: 2, align: 'center'}
        ], [
            {field: 'phone', title: '普通订单总数', align: 'center'},
            {field: 'phone', title: '不可修复订单总数', align: 'center'},
            {field: 'phone', title: '内返订单总数', align: 'center'},
            {field: 'phone', title: '外返订单总数', align: 'center'}
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
        elem: '#LAY-person-manage',
        url: layui.setter.ajaxUrl + '/api/admin/banner/list',
        method: 'get',
        cols: [[
            {type: 'numbers',   title: '序号',           rowspan: 2,    align: 'center'},
            {field: 'imgName',  title: '门店名称',       rowspan: 2,    align: 'center'},
            {field: 'imgName',  title: '人员姓名',       rowspan: 2,    align: 'center'},
            {align: 'center',   title: '技师',           colspan: 3},
            {align: 'center',   title: '业务员',         colspan: 1},
            {align: 'center',   title: '质检员',         colspan: 2},
            {field: 'imgName',  title: '总金额',         rowspan: 2,     align: 'center'},
            {field: 'fagaggg',  title: '产值总工时',     rowspan: 2,     align: 'center'}
        ], [
            {field: 'a',    title: '维修部件数',    align: 'center'},
            {field: 'b',    title: '内返部件数',    align: 'center'},
            {field: 'c',    title: '外返部件数',    align: 'center'},
            {field: 'd',    title: '取/送件数量',   align: 'center'},
            {field: 'e',    title: '质检数量',      align: 'center'},
            {field: 'f',    title: '不合格数量',    align: 'center'},
        ]],
        page: true,
        text: {
            none: '暂无数据',
            error: '对不起，加载出现异常！'
        },
        done: function (data) {
            // document.querySelector(".layui-table").style.width="100%";
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


    exports('value', {})
});