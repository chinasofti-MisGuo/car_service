/**
 @Name：  大数据云赋能 ~ 数据采集
 @Author：Yu.Guo
 */

layui.define(['table', 'form'], function (exports) {
    var $ = layui.$,
        admin = layui.admin,
        view = layui.view,
        table = layui.table,
        form = layui.form;

    var router = layui.router();		/*定义router,用于得到lay-href传递的id*/


    /*数据采集列表*/
    table.render({
        elem: '#LAY-enterPrise-manage',
        url: layui.setter.ajaxUrl + '/api/admin/cloud/enter/list',
        method: 'get',
        where: {
            token: layui.data('data').token,
            id: router.search.id
        },
        cols: [
            [{
                type: 'numbers',
                title: '序号',
                align: 'center'
            }, {
                field: 'corporateName',
                title: '公司名称',
                align: 'center'
            }, {
                field: 'industryType',
                title: '公司行业',
                align: 'center'
            }, {
                field: 'corporateAddress',
                title: '城市',
                align: 'center'
            }, {
                field: 'corporateSize',
                title: '规模',
                align: 'center'
            }, {
                field: 'contacts',
                title: '联系人',
                align: 'center'
            }, {
                field: 'socialPosition',
                title: '社会职务',
                align: 'center'
            }, {
                field: 'phone',
                title: '联系方式',
                align: 'center'
            }, {
                field: 'isData',
                title: '管理数据',
                align: 'center',
                templet: '#isData'
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

    /*企业管理数据列表*/
    table.render({
        elem: '#LAY-manager-manage',
        url: layui.setter.ajaxUrl + '/api/admin/cloud/manager/list',
        method: 'get',
        where: {
            token: layui.data('data').token,
            id: router.search.id
        },
        cols: [
            [{
                type: 'numbers',
                title: '序号',
                align: 'center'
            }, {
                field: 'textDescription',
                title: '文字说明',
                align: 'center'
            }, {
                field: 'remarks',
                title: '备注',
                align: 'center'
            }, {
                title: '操作',
                align: 'center',
                toolbar: '#table-manager-operation',
                width: 200
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

    /*监听企业数据管理编辑、删除操作*/
    table.on('tool(LAY-manager-manage)', function (obj) {
        var data = obj.data;
         if (obj.event === 'edit') {
            admin.popup({
                title: '编辑',
                area: ['600px', '650px'],
                id: 'LAY-popup-user-add',
                success: function (layero, index) {
                    view(this.id).render('cloudEnabling/enterPrise/form', data).done(function () {
                        form.on('submit(LAY-manager-front-submit)', function (data) {
                            var field = data.field;
                            var id = '';
                            $("input:checkbox[name='checkbox']:checked").each(function (i) {
                                id += $(this).attr('id') + ',';
                            });
                            id = id.slice(0, -1);
                            $.ajax({
                                url: layui.setter.ajaxUrl + "/api/admin/cloud/manager/edit",
                                method: "post",
                                contentType: 'application/json;charset=UTF-8',
                                data: JSON.stringify({
                                    'token': layui.data('data').token
                                    ,'enterpriseDataId':id
                                    ,'textDescription':field.textDescription
                                    ,'pdf':field.pdf
                                    ,'remarks':field.remarks
                                    ,'id':obj.data.id
                                }),
                                success: function (data) {
                                    if (data.data == 1) {
                                        layer.alert('已更新', {
                                            icon: 1
                                        });
                                        layui.table.reload('LAY-manager-manage');
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
                                        }, 666);
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
                    view(this.id).render('cloudEnabling/enterPrise/detail', data).done(function () {
                        form.on('submit(LAY-enterPrise-front-submit)', function (data) {
                            var field = data.field;
                            var images = '';
                            $("input[name='reportContent']").each(function (i, item) {
                                images += item.value + ',';
                            });
                            images = images.slice(0, -1);
                            console.log(images);
                            $.ajax({
                                url: layui.setter.ajaxUrl + "/api/admin/cloud/report/edit",
                                method: "post",
                                contentType: 'application/json;charset=UTF-8',
                                data: JSON.stringify({
                                    'token': layui.data('data').token,
                                    'reportContent': images,
                                    'id': obj.data.id
                                }),
                                success: function (data) {
                                    if (data.data == 1) {
                                        layer.alert('已更新', {
                                            icon: 1
                                        });
                                        layui.table.reload('LAY-enterPrise-manage');
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
                                        }, 666);
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
        }

    });

    exports('enter', {})
});