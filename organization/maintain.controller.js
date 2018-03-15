var server = maintainServer();
var isFirst = true;//判断是否第一次进入窗口
var treeData = server.treeData,//获取tree的数据
	agencyData = new Object,
	memberData = new Object;
var addTagName = $('.edit_agency_tag').eq(0),
	agencyEditBox = $('#agencyEditBox'),
	addAgencyBox = $('#addAgencyBox'),
	contents = $('#maintain_content > div'),
	agencyBox = contents.eq(0),
	agencyInputs = agencyBox.find('input');// 机构信息的详情 =》 input
var tableBox = $('#maintain_table'),
	tableQuery = {
		column: {
			'id': '序号',
			'name': '姓名',
			'agency': '所属机构',
			'tel': '电话'
		}
	};
	

treeData.then(function(data) {
 	var tree = document.getElementById('maintian_tree');
 	var html = '';
 	for (var i = 0; i < data.length; i++) {
 		var li = document.createElement('li');
 		li.innerHTML = '<span>' + data[i].name + '</span>';
 		var children = data[i].children;
 		if (children) {
 			li.className = 'has_icon';
 			li.setAttribute('data-height', children.length + 'px')
 			var ul = document.createElement('ul'),
 				cLi = '';
 			for (var ii = 0; ii < children.length; ii++){
 				cLi+= '<li><span>' + children[ii] + '</span></li>'
 			}
 			ul.innerHTML = cLi;
 			li.appendChild(ul);
 		}
	    tree.appendChild(li);
 	}
 	agencyData = data[0].agency;
 	memberData = data[0].member;
})
var tree = $('#maintian_tree');
// 树结构中的双击打开子菜单事件
tree.delegate('li','dbclick', function(e){
	console.log('db')
		return false;
})
//树结构中的单击获取数据事件
tree.delegate('li','click', function(e){
	isFirst = false;
	cancelSetInput();
	var ul = $(this).find('ul').eq(0),
		lis = ul.find('li'),
		h = lis.eq(0).height();
		
	if ($(this).hasClass('open')) {
		ul.css({height:0});
		$(this).removeClass('open');
	} else {
		$(this).addClass('open');
		ul.css({height: lis.length * h + 'px'});
	}
	if (!$(this).hasClass('active')){
		tree.find('li').each(function(){
			$(this).removeClass('active');
		})
		$(this).addClass('active');
		setAgency(agencyData);
		setember(memberData);
	}
	return false;
})

tableBox.html(function(){
	var table = '<table class=\"table\"><thead><tr>'
	var query = tableQuery.column;
	for (var column in query) {
		table+= '<th>' + query[column] + '</th>';
	}
	table+= '<th>操作</th></tr></thead><tbody></tbody></table>';
	return table;
})
var memberTable = $('memberTable > table');//创建table
var tags = $('#maintain_tag > li'); // 两个tag按钮= 机构信息 | 所属成员
// 循环tags对内容进行切换
tags.each(function(i){
	$(this).click(function(){
		tags.each(function(n){$(this).removeClass('active'),contents.eq(n).removeClass('active')});
		$(this).addClass('active');
		contents.eq(i).addClass('active');
	})
})
// 设置机构信息
function setAgency(data) {
	agencyBox.find('input').each(function(){
		$(this).val('加载中...');
		
	})
	var timer = setTimeout(function(){
		setInput();
		clearTimeout(timer);
	}, 130)
	
}
// 设置所属成员的信息
function setember(setData) {
	var bodys = tableBox.find('tbody');
	bodys.html("<tr><td colspan=\"5\">加载中...</td></tr>");
	var timer = setTimeout(function(){
		bodys.html('');
		for ( var i = 0; i < setData.length; i++) {
			var tr = '<tr>',
				data = setData[i];
			var query = tableQuery.column;
			for (var column in query) {
				tr+= '<td>' + data[column] + '</td>';
			}
			tr+= '<td><button class=\"button margin_right10 edit\" data=\"'+
				i +'\">编辑</button>'+
				'<button class=\"button del\" data=\"'+
				i +'\"'+
				'>删除</button></td></tr>';
			bodys.append(tr);
		}
	}, 1000)
	
}
function clearInput() {//将机构所有的input标签值清空
	agencyInputs.each(function() {
		$(this).val('')
	})
}
function setInput() {//给机构所有的input标签设置值
	agencyInputs.each(function(){
		var name = $(this).attr('name');
		$(this).val(agencyData[name]).attr('disabled',true);
	})
}
function cancelSetInput(){//取消编辑
	$('#maintain_tag').removeClass('display_n');
	addTagName.addClass('display_n');
	agencyEditBox.removeClass('display_n');
	addAgencyBox.addClass('display_n');
	agencyEditBox.find('button').addClass('display_n');
	agencyEditBox.find('.edit').removeClass('display_n');
	setInput();

}
// tree中plus 的icon事件
var addBtn = $('#maintain_add');//添加机构
addBtn.click(function(){
	$('#maintain_tag').addClass('display_n');
	addTagName.removeClass('display_n').html('新增机构');
	addAgencyBox.removeClass('display_n');
	agencyEditBox.addClass('display_n');
	if(!isFirst)addAgencyBox.find('.cancel').removeClass('display_n');
	clearInput();
	agencyInputs.attr('disabled', false);
})
// 所有取消按钮的事件
$('.cancel').click(cancelSetInput)
// 所有清空按钮事件
$('.clear').click(clearInput)
// 编辑按钮点击事件
$('.edit').click(function(){
	$('#maintain_tag').addClass('display_n');
	addTagName.removeClass('display_n').html('编辑机构：' + agencyData.name);
	agencyEditBox.find('button').removeClass('display_n');
	agencyInputs.attr('disabled', false);
	$(this).addClass('display_n');
})
var dialogTimer = null;
// 设置弹窗的内容
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
$('.save').eq(1).click(setDialogTempl('确认新增？'))
$('.save').eq(0).click(setDialogTempl('确认更新？'))
$('.delete').click(setDialogTempl('确认删除？'))
//成员编辑弹窗

// 成员信息编辑弹窗
tableBox.delegate('.edit','click',function(){
	var dialogEditMemberDom = $.ajax({
			url: 'organization/DialogEditMember.templ.html',
			dataType: "html",
			timeout: 10000
		});
	var id = $(this).attr('data');
	dialogEditMemberDom.then(function(data) {
		var div = $('<div>').html(data);
		var inputs = div.find('input'),
			select = div.find('select').eq(0);
		select.attr('value',memberData[id].type);
		inputs.each(function(){
			var name = $(this).attr('name');
			$(this).attr('value',memberData[id][name]);
		})
		var dialog = new createDialog(div.html(), [
				{name: '保存'},
				{name: '取消'}
			]);
		dialog.createDom().show();
	})
})
// 成员信息删除弹窗事件
tableBox.delegate('.del','click',function(){
	var tip = '确认删除“' + memberData[$(this).attr('data')].name +'”?';
	setDialogTempl(tip)();
})