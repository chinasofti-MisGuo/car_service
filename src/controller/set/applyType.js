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
        elem: '#LAY-service-store-manage',
        url: layui.setter.ajaxUrl + 'rework/reason/list',
        method: 'get',
        cols: [
            [{
                type: 'checkbox'
            }, {
                type: 'numbers',
                title: '序号',
                align: 'center'
            }, {
                field: 'partName',
                title: '部件名称',
                align: 'center'
            }, {
                field: 'applyType',
                title: '施工类型',
                align: 'center'
            }, {
                field: 'price',
                title: '价格',
                align: 'center'
            }, {
                title: '操作',
                align: 'center',
                toolbar: '#table-cloud-operation',
                width: 200
            }]
        ],
        page: true,
        text: {
            none: '暂无数据',
            error: '对不起，加载出现异常！'
        },
        done: function (data) {
            console.log(data)
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
    table.on('tool(LAY-service-store-manage)', function (obj) {
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
                            layui.table.reload('LAY-service-store-manage');
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
            admin.popup({
                title: '编辑',
                area: ['600px', '650px'],
                id: 'LAY-popup-user-add',
                success: function (layero, index) {
                    view(this.id).render('serviceStore/form', data).done(function () {
                        form.on('submit(LAY-reportData-front-submit)', function (data) {
                            var field = data.field;
                            field.token = layui.data('data').token;
                            field.id = obj.data.id;
                            var id = '';
                            $("input:checkbox[name='checkbox']:checked").each(function (i) {
                                id += $(this).attr('id') + ',';
                            });
                            id = id.slice(0, -1);
                            $.ajax({
                                url: layui.setter.ajaxUrl + "/api/admin/cloud/report/edit",
                                method: "post",
                                contentType: 'application/json;charset=UTF-8',
                                data: JSON.stringify({
                                    field
                                }),
                                success: function (data) {
                                    if (data.data == 1) {
                                        layer.alert('已更新', {
                                            icon: 1
                                        });
                                        layui.table.reload('LAY-service-store-manage');
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
                    view(this.id).render('serviceStore/detail', data).done(function () {
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