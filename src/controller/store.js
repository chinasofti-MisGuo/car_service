/**
 @Name：  大数据云赋能
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
        elem: '#LAY-store-manage',
        url: layui.setter.ajaxUrl + '/api/store/list',
        method: 'get',
        cols: [
            [{
                type: 'checkbox'
            }, {
                field: 'storeName',
                title: '门店名称',
                align: 'center'
            },  {
                field: 'storeAddress',
                title: '门店地址',
                align: 'center'
            },  {
                field: 'storeStatus',
                title: '状态',
                align: 'center'
            }, {
                field: 'liableName',
                title: '负责人姓名',
                align: 'center'
            }, {
                field: 'liablePhone',
                title: '负责人手机号',
                align: 'center'
            }, {
                field: 'useArea',
                title: '使用区域',
                align: 'center'
            }, {
                field: 'validPeriod',
                title: '有效期',
                align: 'center'
            }, {
                field: 'createTime',
                title: '创建日期',
                align: 'center'
            }, {
                field: 'accountBank',
                title: '开户行',
                align: 'center'
            }, {
                field: 'accountName',
                title: '户名',
                align: 'center'
            }, {
                field: 'bankCardNumber',
                title: '账号',
                align: 'center'
            }, {
                field: 'taxNumber',
                title: '税号',
                align: 'center'
            }, {
                title: '操作',
                align: 'center',
                toolbar: '#table-cloud-operation',
                width: 200
            }]
        ],
        where:{
            limit:10,
            page:1
        },
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

    /*监听上下架开关*/
    form.on('switch(switchTest)', function (data) {
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
            success: function (data) {
                if (data.data == 1) {
                    if (flag == false) {
                        layer.alert('已禁用', {
                            icon: 1
                        });
                    } else {
                        layer.alert('已启用', {
                            icon: 1
                        });
                    }
                } else {
                    layer.alert('操作失败,请稍后重试', {
                        icon: 2
                    });
                }
                if (data.code == 403) {
                    layer.closeAll();
                    admin.exit();
                    setTimeout(function () {
                        layer.alert('此账号已在别处登录,请重新登录！', {
                            icon: 5
                        });
                    }, 666);
                }
                $('checkbox').prop('checked', false);
                layui.table.reload('LAY-banner-manage');
            },
            error: function (err) {
                layer.alert("操作失败", {
                    icon: 2
                });
                layui.table.reload('LAY-banner-manage');
            }
        });
    });

    /*监听数据报告编辑、删除操作*/
    table.on('tool(LAY-store-manage)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: layui.setter.ajaxUrl + "/api/admin/cloud/report/del",
                    method: "post",
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify({
                        'token': layui.data('data').token,
                        'id': obj.data.id
                    }),
                    success: function (data) {
                        if (data.code == 403) {
                            layer.closeAll();
                            admin.exit();
                            setTimeout(function () {
                                layer.alert('此账号已在别处登录,请重新登录！', {
                                    icon: 5
                                });
                            }, 666);
                        }
                        if (data.data == 1) {
                            layer.alert("已删除", {
                                icon: 1
                            });
                            layui.table.reload('LAY-store-manage');
                        } else {
                            layer.alert("删除失败,请稍后重试", {
                                icon: 2
                            });
                        }
                    },
                    error: function (data) {
                        layer.alert("操作失败", {
                            icon: 2
                        });
                    }
                });
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            console.log(obj.data.validPeriod)
            var temp =obj.data.validPeriod;
            obj.data.validPeriod=temp[0]+'-'+temp[1]+'-'+temp[2]+' '+temp[3]+':'+temp[4]+':'+temp[5];
            admin.popup({
                title: '编辑',
                area: ['600px', '650px'],
                id: 'LAY-popup-user-add',
                success: function (layero, index) {
                    view(this.id).render('store/form', data).done(function () {
                        form.on('submit(LAY-store-front-submit)', function (data) {
                            var field = data.field;
                            // field.token = layui.data('data').token;
                            field.id = obj.data.id;
                            field.validPeriod=field.validPeriod.replace(" ",'T')
                            field.useArea = field.province + field
                                .city + field.county;
                            $.ajax({
                                url: layui.setter.ajaxUrl + "api/store/update",
                                method: "PUT",
                                contentType: 'application/json;charset=UTF-8',
                                data: JSON.stringify(field),
                                success: function (data) {
                                    if (data.data == 1) {
                                        layer.alert('已更新', {
                                            icon: 1
                                        });
                                        layui.table.reload('LAY-store-manage');
                                    } else {
                                        layer.alert('编辑失败，请稍后重试', {
                                            icon: 2
                                        });
                                    }
                                    if (data.code == 403) {
                                        layer.closeAll();
                                        admin.exit();
                                        setTimeout(function () {
                                            layer.alert('此账号已在别处登录,请重新登录！', {
                                                icon: 5
                                            });
                                        }, 10);
                                    }
                                },
                                error: function (data) {
                                    layer.alert('编辑失败，请稍后重试', {
                                        icon: 2
                                    });
                                }
                            });
                            layer.close(index);
                        });
                    });
                }
            });
        } else if (obj.event === 'detail') {
            admin.popup({
                title: '详情',
                area: ['1000px', '700px'],
                id: 'LAY-popup-user-add',
                success: function (layero, index) {
                    view(this.id).render('store/detail', data).done(function () {
                        table.render({
                            url: layui.setter.ajaxUrl + '/'
                            , elem: '#LAY-partner-manage'
                            , method: "get"
                            , contentType: 'application/json;charset=UTF-8'
                            , where: {'token': layui.data('data').token}
                            , title: '详情'
                            , cols: [[
                                {type: 'numbers',title: '序号',align: 'center'},
                                {field: 'type', title: '类别', align: 'center'},
                                {field: 'partnerName',title: '公司名称',align: 'center'},
                                {field: 'liableName',title: '姓名',align: 'center'},
                                {field: 'liablePhone',title: '手机号',align: 'center'},
                                {field: 'address',title: '地址',align: 'center'},
                                {field: 'status', title: '状态', align: 'center', templet: '#status' }
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
                            url: layui.setter.ajaxUrl + '/'
                            , elem: '#LAY-user-message'
                            , method: "get"
                            , contentType: 'application/json;charset=UTF-8'
                            , where: {'token': layui.data('data').token}
                            , title: '人员列表'
                            , cols: [[
                                {type: 'numbers',title: '序号',align: 'center'},
                                {field: 'actualName', title: '姓名', align: 'center'},
                                {field: 'phone', title: '手机号', align: 'center'},
                                {field: 'role', title: '角色', align: 'center'},
                                {field: 'status', title: '状态', align: 'center', templet: '#status' }
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
                    });
                }
            });
        }

    });

    exports('serviceStore', {})
});