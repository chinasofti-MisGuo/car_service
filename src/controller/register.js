/**
	 @Name：  数据收集
	 @Author：Yu.Guo
 */

layui.define(['table', 'form'], function(exports) {
	var $ = layui.$,
		admin = layui.admin,
		view = layui.view,
		table = layui.table,
		form = layui.form;

	/*数据收集列表*/
	table.render({
		elem: '#LAY-register-manage',
		url: layui.setter.ajaxUrl + '/api/admin/register/list',
		method: 'get',
		cols: [
			[{
				type: 'numbers',
				title: '序号',
				align: 'center'
			}, {
				field: 'userName',
				title: '姓名',
				align: 'center'
			}, {
				field: 'phone',
				title: '联系电话',
				align: 'center'
			}, {
				field: 'education',
				title: '学历',
				align: 'center',
				templet: '#education'
			}, {
				field: 'major',
				title: '专业',
				align: 'center',
				templet: '#major'
			}, {
				field: 'job',
				title: '社会职务',
				align: 'center'
			},{
				field: 'address',
				title: '地址',
				align: 'center'
			}, {
				field: 'createTime',
				title: '创建时间',
				align: 'center'
			}, {
				title: '操作',
				align: 'center',
				toolbar: '#table-register-operation'
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
	table.on('tool(LAY-register-manage)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				$.ajax({
					url: layui.setter.ajaxUrl + "/api/admin/register/del",
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
							layui.table.reload('LAY-register-manage');
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
		} else if(obj.event === 'detail') {
			admin.popup({
				title: '详情',
				area: ['700px', '720px'],
				id: 'LAY-popup-user-add',
				success: function(layero, index) {
					view(this.id).render('register/detail', data).done(function() {
						form.on('submit(LAY-register-front-submit)', function(data) {
							layer.close(index);
						});
					});
				}
			});
		}
	});

	exports('register', {})
});