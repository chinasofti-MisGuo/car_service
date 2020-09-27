/**

 @Name：用户管理 
 @Author：Yu.Guo
    
 */

layui.define(['table', 'form'], function(exports) {
	var $ = layui.$,
		admin = layui.admin,
		view = layui.view,
		table = layui.table,
		form = layui.form;

	//用户管理
	table.render({
		elem: '#LAY-user-manage',
		url: layui.setter.ajaxUrl + '/api/admin/user/list',
		cols: [
			[{
				type: 'numbers',
				title: '序号',
				align: 'center'
			}, {
				field: 'nickName',
				title: '用户名',
				align:'center'
			}, {
				field: 'phone',
				title: '手机号',
				align:'center'
			},{
				field: 'corporateName',
				title: '公司名称',
				align:'center'
			}, {
				field: 'socialPosition',
				title: '社会职务',
				align:'center'
			}, {
				field: 'city',
				title: '工作城市',
				align:'center'
			}, {
				field: 'corporateSize',
				title: '公司规模',
				align:'center'
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
				}, 500);
			}
		}
	});


	exports('user', {})
});