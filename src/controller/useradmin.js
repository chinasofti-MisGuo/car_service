/**
	 @Name：权限管理  管理员管理 角色管理
	 @Author：郭宇
 */

layui.define(['table', 'form'], function(exports) {
	var $ = layui.$,
		admin = layui.admin,
		view = layui.view,
		table = layui.table,
		form = layui.form;

	//管理员列表
	table.render({
		elem: '#LAY-user-back-manage',
		url: layui.setter.ajaxUrl + '/api/admin/auth/user/list',
		method: 'get',
		cols: [
			[{
				field: 'userName',
				title: '管理员名称',
				align: 'center'
			}, {
				field: 'roles',
				title: '角色',
				align: 'center'
			}, {
				field: 'phone',
				title: '联系方式',
				align: 'center'
			}, {
				field: 'createTime',
				title: '创建时间',
				align: 'center'
			},{
				field: 'loginTime',
				title: '登录时间',
				align: 'center',
				templet: '#loginTime'
			}, {
				title: '操作',
				align: 'center',
				toolbar: '#table-useradmin-webuser'
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

	//监听工具条
	table.on('tool(LAY-user-back-manage)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				$.ajax({
					url: layui.setter.ajaxUrl + "/api/admin/auth/user/del",
					method: "post",
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify({
						'token': layui.data('data').token,
						'id': data.id
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
							layui.table.reload('LAY-user-back-manage');
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
				title: '编辑管理员',
				area: ['500px', '400px'],
				id: 'LAY-popup-user-add',
				success: function(layero, index) {
					view(this.id).render('adminauth/adminuser/form', data).done(function() {
						form.render();
						form.on('submit(LAY-useradmin-front-submit)', function(data) {
							var field = data.field;
							$.ajax({
								url: layui.setter.ajaxUrl + '/api/admin/auth/user/edit',
								method: "post",
								contentType: 'application/json;charset=UTF-8',
								data: JSON.stringify({
									'token': layui.data('data').token,
									'userName': field.userName /*管理员名称*/ ,
									'rolesId': field.rolesId /*角色*/ ,
									'id': obj.data.id,
									'password': field.passWord,
									'phone':field.phone
								}),
								success: function(data) {
									if(data.data == 1) {
										layer.alert('已更新', {
											icon: 1
										});
										layui.table.reload('LAY-user-back-manage');
									} else {
										layer.alert('编辑失败，请稍后重试', {
											icon: 2
										});
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

	//角色管理
	table.render({
		elem: '#LAY-user-back-role',
		url: layui.setter.ajaxUrl + '/api/admin/auth/role/list',
		method: 'get',
		cols: [
			[{
				field: 'rolesName',
				title: '角色名称',
				align: 'center'
			}, {
				field: 'createTime',
				title: '创建时间',
				align: 'center'
			}, {
				title: '操作',
				align: 'center',
				toolbar: '#table-role-webuser'
			}]
		],
		page: true,
		text: {
			none: '暂无数据',
			error: '对不起，加载出现异常！'
		}
	});

	//监听角色工具条
	table.on('tool(LAY-user-back-role)', function(obj) {
		var data = obj.data;
		if(obj.event === 'edit') {
			admin.popup({
				title: '编辑',
				area: ['500px', '480px'],
				id: 'LAY-popup-user-add',
				success: function(layero, index) {
					view(this.id).render('adminauth/role/form', data).done(function() {
						form.render();
						form.on('submit(LAY-role-front-submit)', function(data) {
							var field = data.field;
							var authId = '';
							$("input[name='checkbox']").each(function(i) {
								authId += $(this).attr('id') + ',';
							});
							authId = authId.slice(0, -1);
							$.ajax({
								type: 'POST',
								contentType: 'application/json;charset=UTF-8',
								url: layui.setter.ajaxUrl + '/api/admin/auth/role/edit',
								data: JSON.stringify({
									'token': layui.data('data').token,
									'rolesName': field.rolesName,
									'id': obj.data.id,
									'authId': authId
								}),
								success: function(data) {
									if(data.code == 200) {
										layer.alert('已更新', {
											icon: 1
										});
									} else {
										layer.alert("操作失败", {
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
							layui.table.reload('LAY-user-back-role');
							layer.close(index);
						});
					});
				}
			});
		}
	});
	exports('useradmin', {})
});