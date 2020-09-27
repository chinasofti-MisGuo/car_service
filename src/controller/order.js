/**
 @Name：  轮播图管理
 @Author：Yu.Guo
 */

layui.define(['table', 'form'], function(exports) {
    var $ = layui.$,
        admin = layui.admin,
        view = layui.view,
        table = layui.table,
        form = layui.form;

    /*轮播图列表*/
    table.render({
        elem: '#LAY-order-manage',
        url: layui.setter.ajaxUrl + '/api/admin/banner/list',
        method: 'get',
        cols: [
            [{
                type: 'checkbox'
            },{
                type: 'numbers',
                title: '序号',
                align: 'center'
            }, {
                field: 'imgName',
                title: '委托书号',
                align: 'center'
            }, {
                field: 'imgName',
                title: '车牌号',
                align: 'center'
            }, {
                field: 'imgName',
                title: '取件时间',
                align: 'center'
            }, {
                field: 'imgName',
                title: '门店名称',
                align: 'center'
            }, {
                field: 'imgName',
                title: '合作商名称',
                align: 'center'
            }, {
                field: 'imgName',
                title: '保险公司名称',
                align: 'center'
            }, {
                field: 'imgState',
                title: '状态',
                align: 'center',
                templet: '#status'
            }, {
                field: 'imgUrl',
                title: '支付状态',
                align: 'center',
                templet: '#payStatus'
            }, {
                field: 'imgName',
                title: '订单金额',
                align: 'center'
            }, {
                field: 'createTime',
                title: '交付时间',
                align: 'center'
            }, {
                title: '操作',
                align: 'center',
                toolbar: '#table-banner-operation',
                width:200
            }]
        ],
        page: true,
        text: {
            none: '暂无数据',
            error: '对不起，加载出现异常！'
        },
        done: function(data) {
            if(data.code == 403) {
                layer.closeAll();
                admin.exit();
                setTimeout(function() {
                    layer.alert('此账号已在别处登录,请重新登录！', {
                        icon: 5
                    });
                }, 666);
            }
        }
    });

    /*监听编辑、删除操作*/
    table.on('tool(LAY-order-manage)', function(obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            admin.popup({
                title: '详情',
                area: ['100%', '100%'],
                id: 'LAY-popup-user-add',
                success: function (layero, index) {
                    view(this.id).render('order/detail', data).done(function () {
                        table.render({
                            url: layui.setter.ajaxUrl + '/api/admin/banner/list'
                            , elem: '#LAY-partner-message'
                            , method: "get"
                            , contentType: 'application/json;charset=UTF-8'
                            , where: {'token': layui.data('data').token}
                            , title: '合作商信息'
                            , cols: [[
                                {field: 'partnerName',title: '合作商名称',align: 'center'},
                                {field: 'liableName',title: '负责人姓名',align: 'center'},
                                {field: 'liablePhone',title: '手机号',align: 'center'}
                            ]]
                            , text: {none: '暂无数据', error: '对不起，加载出现异常！'}
                            , done: function (data) {
                                if (data.code == 403) {
                                    layer.closeAll();
                                    admin.exit();
                                    setTimeout(function () {
                                        layer.alert('此账号已在别处登录,请重新登录！', {icon: 5});
                                    }, 10);
                                }
                            }
                        });

                        table.render({
                            url: layui.setter.ajaxUrl + '/api/admin/banner/list'
                            , elem: '#LAY-Insurance-manage'
                            , method: "get"
                            , contentType: 'application/json;charset=UTF-8'
                            , where: {'token': layui.data('data').token}
                            , title: '保险公司信息'
                            , cols: [[
                                {field: 'actualName', title: '保险公司名称', align: 'center'},
                                {field: 'phone', title: '手机号', align: 'center'},
                                {field: 'role', title: '负责人姓名', align: 'center'},
                                {field: 'role', title: '报案号', align: 'center'}
                            ]]
                            , text: {none: '暂无数据', error: '对不起，加载出现异常！'}
                            , done: function (data) {
                                if (data.code == 403) {
                                    layer.closeAll();
                                    admin.exit();
                                    setTimeout(function () {
                                        layer.alert('此账号已在别处登录,请重新登录！', {icon: 5});
                                    }, 10);
                                }
                            }
                        });


                        table.render({
                            url: layui.setter.ajaxUrl + '/api/admin/banner/list'
                            , elem: '#LAY-piece-manage'
                            , method: "get"
                            , contentType: 'application/json;charset=UTF-8'
                            , where: {'token': layui.data('data').token}
                            , title: '取件信息'
                            , cols: [[
                                {field: 'actualName', title: '取件员姓名', align: 'center'},
                                {field: 'phone', title: '取件员手机号', align: 'center'},
                                {field: 'role', title: '取件时间', align: 'center'}
                            ]]
                            , text: {none: '暂无数据', error: '对不起，加载出现异常！'}
                            , done: function (data) {
                                if (data.code == 403) {
                                    layer.closeAll();
                                    admin.exit();
                                    setTimeout(function () {
                                        layer.alert('此账号已在别处登录,请重新登录！', {icon: 5});
                                    }, 10);
                                }
                            }
                        });


                        table.render({
                            url: layui.setter.ajaxUrl + '/api/admin/banner/list'
                            , elem: '#LAY-project-manage'
                            , method: "get"
                            , contentType: 'application/json;charset=UTF-8'
                            , where: {'token': layui.data('data').token}
                            , title: '维修项目列表'
                            , cols: [[
                                {type: 'numbers',title: '序号',align: 'center', rowspan: 2 },
                                {field: 'actualName', title: '部件名称', align: 'center', rowspan: 2 },
                                {field: 'phone', title: '施工类型', align: 'center', rowspan: 2 },
                                {field: 'role', title: '价格', align: 'center', rowspan: 2 },
                                {field: 'phone', title: '维修技师', align: 'center' , colspan: 4},
                                {field: 'phone', title: '质检员', align: 'center' , colspan: 3},
                                {field: 'phone', title: '状态', align: 'center',templet: '#status', rowspan: 2 },
                                {field: 'phone', title: '图片', align: 'center',templet: '#image', rowspan: 2 }
                            ], [{field: 'phone', title: '姓名', align: 'center' },
                                {field: 'phone', title: '手机号', align: 'center'},
                                {field: 'phone', title: '开工时间', align: 'center'},
                                {field: 'phone', title: '完工时间', align: 'center'},
                                {field: 'phone', title: '姓名', align: 'center'},
                                {field: 'phone', title: '手机号', align: 'center'},
                                {field: 'phone', title: '时间', align: 'center'}
                            ]]
                            , text: {none: '暂无数据', error: '对不起，加载出现异常！'}
                            , page: true
                            , done: function (data) {
                                if (data.code == 403) {
                                    layer.closeAll();
                                    admin.exit();
                                    setTimeout(function () {
                                        layer.alert('此账号已在别处登录,请重新登录！', {icon: 5});
                                    }, 10);
                                }
                            }
                        });

                    });
                }
            });
        }
    });

    /*监听上下架开关*/
    form.on('switch(switchTest)', function(data) {
        var flag = this.checked;
        var id = data.elem.attributes['switch_id'].nodeValue;
        $.ajax({
            url: layui.setter.ajaxUrl + '/api/admin/banner/upper',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            type: 'POST',
            data: JSON.stringify({
                token: layui.data('data').token,
                'id': id
            }),
            success: function(data) {
                if(data.data == 1) {
                    if(flag == false) {
                        layer.alert('已下架', {
                            icon: 1
                        });
                    } else {
                        layer.alert('已上架', {
                            icon: 1
                        });
                    }
                } else {
                    layer.alert('操作失败,请稍后重试', {
                        icon: 2
                    });
                }
                if(data.code == 403) {
                    layer.closeAll();
                    admin.exit();
                    setTimeout(function() {
                        layer.alert('此账号已在别处登录,请重新登录！', {
                            icon: 5
                        });
                    }, 666);
                }
                $('checkbox').prop('checked', false);
                layui.table.reload('LAY-order-manage');
            },
            error: function(err) {
                layer.alert("操作失败", {
                    icon: 2
                });
                layui.table.reload('LAY-order-manage');
            }
        });
    });

    exports('order', {})
});