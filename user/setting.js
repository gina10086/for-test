var crumbsDom = '<div class=\"crumbs\">当前位置：<span>系统管理</span><span>用户权限管理</span><span>用户管理</span></div>';
var addDom = '<div class=\"form_list dialog_form\">'+
				'<label for=\"user\">用 户 名：</label>'+
				'<input type=\"text\" id=\"user\">'+
				'<label for=\"name\">姓    名：</label>'+
				'<input type=\"text\" id=\"name\">'+
				'<label for=\"forWitch\">所属机构：</label>'+
				'<select name=\"\" id=\"forWitch\">'+
				'<option value=\"sss\">ddd</option>'+
				'</select>'+
 				'<span>密码强度：</span>'+
				'<ul class=\"pw\">'+
				'<li class=\"red\">弱</li>'+
				'<li class=\"has_border\">中</li>'+
				'<li>强</li>'+
				'</ul>'
			'</div>';
var checkTable = '';

var addBtn = document.getElementById('add');
var moreBtn = document.getElementById('more');
addBtn.addEventListener('click',function(){
	var dialog = new createDialog(crumbsDom+addDom+checkTable);
		dialog.createDom();
		dialog.show();
},false);
moreBtn.addEventListener('click',function(){
	var dialog = new createDialog(crumbsDom);
		dialog.createDom();
		dialog.show();
},false)
moreBtn.attachEvent('click',function(){
	var dialog = new createDialog(crumbsDom);
		dialog.createDom();
		dialog.show();
},false)

