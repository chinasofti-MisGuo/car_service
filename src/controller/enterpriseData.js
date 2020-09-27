/**
	 @Name：  统计数据
	 @Author：Yu.Guo
 */

layui.define(['table', 'form'], function(exports) {
	var $ = layui.$,
		admin = layui.admin,
		view = layui.view,
		table = layui.table,
		form = layui.form;

	/*采集企业数量*/
	table.render({
		elem: '#LAY-data-manage',
		url: layui.setter.ajaxUrl + '/api/admin/data/enterprise/number',
		method: 'get',
		cols: [
			[{
				type: 'numbers',
				title: '序号',
				align: 'center'
			}, {
				field: 'enterPriseCount',
				title: '基础数据数量',
				align: 'center'
			}, {
				field: 'managerDataCount',
				title: '管理数据数量',
				align: 'center'
			}]
		],
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

	/*赋能报告总数量*/
	table.render({
		elem: '#LAY-report-manage',
		url: layui.setter.ajaxUrl + '/api/admin/data/report/number',
		method: 'get',
		cols: [
			[{
				type: 'numbers',
				title: '序号',
				align: 'center'
			}, {
				field: 'OnclickNumber',
				title: '点击总量',
				align: 'center'
			}, {
				field: 'ReadWholeNumber',
				title: '阅读完成总人数',
				align: 'center'
			}, {
				field: 'DownloadNumber',
				title: '下载报告总数量',
				align: 'center'
			}, {
				field: 'BuyNumber',
				title: '交易总量',
				align: 'center'
			}]
		],
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

	/*合作机构数量*/
	table.render({
		elem: '#LAY-cooperation-manage',
		url: layui.setter.ajaxUrl + '/api/admin/data/cooperation/number',
		method: 'get',
		cols: [
			[{
				type: 'numbers',
				title: '序号',
				align: 'center'
			}, {
				field: 'cooperationCount',
				title: '合作机构数量',
				align: 'center'
			}]
		],
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

	exports('enterpriseData', {})
});