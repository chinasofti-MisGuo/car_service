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
		elem: '#LAY-partner-manage',
		url: layui.setter.ajaxUrl + 'api/partner/add',
		method: 'get',
		cols: [
			[{
				field: 'address',
				title: '地址',
				align: 'center'
			}, {
				field: 'longitude',
				title: '经度',
				align: 'center'
			}, {
				field: 'latitude',
				title: '纬度',
				align: 'center'
			}, {
				field: 'liableName',
				title: '联系人姓名',
				align: 'center',
				templet: '#status'
			}, {
				field: 'liablePhone',
				title: '联系人手机号',
				align: 'center'
			},{
				field: 'partnerName',
				title: '合作商名称',
				align: 'center'
			},{
				field: 'region',
				title: '地区',
				align: 'center'
			},{
				field: 'storeId',
				title: '门店编号',
				align: 'center'
			}, {
				title: '操作',
				align: 'center',
				toolbar: '#table-partner-operation'
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
	table.on('tool(LAY-partner-manage)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				$.ajax({
					url: layui.setter.ajaxUrl + "/api/admin/partner/del",
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
							layui.table.reload('LAY-partner-manage');
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
				area: ['500px', '550px'],
				id: 'LAY-popup-user-add',
				success: function(layero, index) {
					view(this.id).render('partner/form', data).done(function() {
						form.on('submit(LAY-partner-front-submit)', function(data) {
							var field = data.field;
							$.ajax({
								url: layui.setter.ajaxUrl + "/api/admin/partner/edit",
								method: "post",
								contentType: 'application/json;charset=UTF-8',
								data: JSON.stringify({
									 'token': layui.data('data').token
			              			,'partnerName':field.partnerName
			              			,'partnerPhone':field.partnerPhone
			              			,'partnerPeople':field.partnerPeople
			              			,'startTime':field.startTime
			              			,'endTime':field.endTime
			              			,'status':field.status
									,'id': obj.data.id
								}),
								success: function(data) {
									if(data.data == 1) {
										layer.alert('已更新', {
											icon: 1
										});
										layui.table.reload('LAY-partner-manage');
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
			url: layui.setter.ajaxUrl + '/api/admin/partner/stop',
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
				layui.table.reload('LAY-partner-manage');
			},
			error: function(err) {
				layer.alert("操作失败", {
					icon: 2
				});
				layui.table.reload('LAY-partner-manage');
			}
		});
	});

	exports('partner', {})
});