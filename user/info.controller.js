var crumbsDom = '<div class=\"crumbs\">当前位置：<span>系统管理</span><span>用户权限管理</span><span>用户管理</span></div>';

var checkTable = '';

var addBtn = $('#add');//增加
var moreBtn = $('.more');//详情
addBtn.click('click',function(){
	var dom = $.ajax({
			url: 'user/DialogEditUser.templ.html',
			dataType: "html",
			timeout: 10000
		});
	dom.then(function(data){
		var dialog = new createDialog(crumbsDom+data, [
				{name: '确认'},
				{name: '取消'}
			]);
		dialog.createDom();
		dialog.show();
	})
});
moreBtn.click(function(){
	var dom = $.ajax({
			url: 'user/DialogMore.templ.html',
			dataType: "html",
			timeout: 10000
		});
	dom.then(function(data){
		var dialog = new createDialog(crumbsDom+data);
		dialog.createDom();
		dialog.show();
	})
})
var editBtn = $('.edit');
editBtn.click(function(){
	var dom = $.ajax({
			url: 'user/DialogEditUser.templ.html',
			dataType: "html",
			timeout: 10000
		});
	dom.then(function(data){
		var dialog = new createDialog(crumbsDom+data, [
				{name: '确认'},
				{name: '取消'}
			]);
		dialog.createDom();
		dialog.show();
	})
})
var dialogBox = $('#dialog');
dialogBox.delegate('#check_all','click',function(){
	var table = $(this).parents('table'),
		checked = $(this).is(':checked');
	table.find('input').prop("checked",checked);

})
var dialogTimer = null;
function setDialogTempl(text) {
	clearInterval(dialogTimer);
	return function() {
		var buttons = [
			{
				name: '确认',
				callBack: function(dialog, btn){
					var s = 5;
					btn.setAttribute('disabled', true)
					$('.dialog_btn').eq(0).html('<p>操作成功！</p><span>' + s + '秒后关闭</span>');
					 dialogTimer= setInterval(function(){
						s--;
						if(s == 0) {
							clearInterval(dialogTimer);
							dialog.close();
						}
						$('.dialog_btn').eq(0).html('<p>操作成功！</p><span>' + s + '秒后关闭</span>');
					},1000)
				},
				class:'dialog_btn_big'
			},
			{
				name: '取消',
				class:'dialog_btn_big del'
			}
		];
		var dialog = new createDialog('<div class=\"dialog_btn\"><p>' + text+ '</p></div>', buttons);
		dialog.createDom().show();
	}
}
$('#info_table').delegate('.del','click', setDialogTempl('确认删除？'))
//分页

$('#pagenation').jqPaginator({
    totalPages: 15,
    visiblePages: 10,
    currentPage: 1,
    first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',  
	prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',  
	next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',  
	last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',  
	page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',  
    onPageChange: function (num, type) {

        $('.page_text').html('当前第' + num + '页');
    }
});