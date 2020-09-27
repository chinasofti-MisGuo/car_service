/**
	 @Name：  模块管理
	 @Author：Yu.Guo
 */

layui.define(['table', 'form'], function(exports) {
	var $ = layui.$,
		admin = layui.admin,
		view = layui.view,
		table = layui.table,
		form = layui.form;

	table.render({
		elem: '#LAY-modular-manage',
		url: layui.setter.ajaxUrl + '/api/admin/modular/list',
		method: 'get',
		cols: [
			[{
				type: 'numbers',
				title: '序号',
				align: 'center'
			}, {
				field: 'modularName',
				title: '模块名称',
				align: 'center'
			},{
				field: 'createTime',
				title: '创建时间',
				align: 'center'
			}, {
				title: '操作',
				align: 'center',
				toolbar: '#table-modular-operation'
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
	table.on('tool(LAY-modular-manage)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				$.ajax({
					url: layui.setter.ajaxUrl + "/api/admin/modular/del",
					method: "post",
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify({
						'token': layui.data('data').token,
						'id': obj.data.id
					}),
					success: function(data) {
						if(data.code == 403) {
							layer.closeAll();
							admin.exit();
							setTimeout(function() {
								layer.alert('此账号已在别处登录,请重新登录！', {
									icon: 5
								});
							}, 666);
						}
						if(data.data == 1) {
							layer.alert("已删除", {
								icon: 1
							});
							layui.table.reload('LAY-modular-manage');
						} else {
							layer.alert("删除失败,请稍后重试", {
								icon: 2
							});
						}
					},
					error: function(data) {
						layer.alert("操作失败", {
							icon: 2
						});
					}
				});
				layer.close(index);
			});
		} else if(obj.event === 'edit') {
			admin.popup({
				title: '编辑',
				area: ['500px', '400px'],
				id: 'LAY-popup-user-add',
				success: function(layero, index) {
					view(this.id).render('modular/edit', data).done(function() {
						form.on('submit(LAY-modular-front-submit)', function(data) {
							var field = data.field;
							$.ajax({
								url: layui.setter.ajaxUrl + "/api/admin/modular/edit",
								method: "post",
								contentType: 'application/json;charset=UTF-8',
								data: JSON.stringify({
									 'token': layui.data('data').token
			              			,'modularName':field.modularName
			              			,'baseId':field.reportIndustry
									,'id': obj.data.id
								}),
								success: function(data) {
									if(data.data == 1) {
										layer.alert('已更新', {
											icon: 1
										});
										layui.table.reload('LAY-modular-manage');
									} else {
										layer.alert('编辑失败，请稍后重试', {
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
								},
								error: function(data) {
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

	/*监听上下架开关*/
	form.on('switch(switchTest)', function(data) {
		var flag = this.checked;
		var id = data.elem.attributes['switch_id'].nodeValue;
		$.ajax({
			url: layui.setter.ajaxUrl + '/api/admin/modular/stop',
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
						layer.alert('已停用', {
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
				layui.table.reload('LAY-modular-manage');
			},
			error: function(err) {
				layer.alert("操作失败", {
					icon: 2
				});
				layui.table.reload('LAY-modular-manage');
			}
		});
	});

	exports('modular', {})
});