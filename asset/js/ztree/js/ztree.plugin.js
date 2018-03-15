var scripts = document.getElementsByTagName('script');

//检测是否加载了jquery和ztree
var j = 0, z = 0;
for (var i = 0; i < scripts.length; i++) {
	var src = scripts[i].src;
	(src.indexOf('jquery-1.4.4.min.js') > 0) && (j++);
	(src.indexOf('jquery.ztree.all-3.5.min.js') > 0) && (z++);
}
var head = document.head,
	title = head.getElementsByTagName('title')[0];
var jq = document.createElement('script');
	jq.src = 'js/jquery-1.4.4.min.js';
var zt = document.createElement('script');
	zt.src = 'js/jquery.ztree.all-3.5.min.js';
var link = document.createElement('link');
	link.href = 'css/zTreeStyle.css';
	link.rel="stylesheet";
	document.head.insertBefore(link, title);
link.onload = function() {
	if (j === 0) {
		document.head.insertBefore(jq, title);
	}
}
jq.onload = function(){  
   if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){  
		if (z === 0) {
			document.head.insertBefore(zt, title);
		}
   	}
}
function settingZtree (settingSet,callBack) {
	// settingSet [object] => {type,data,node}
	// type 选填 [string] => check[复选框]|radio[单选框]|view[默认为菜单]
	// data 必填 [Array] => [{},...]
	//		eg: {id:1[必填,不能重复], pId:0[必填,对应的父级id], name:"随意勾选 1"[必填], open:true[boolean选填，默认false],....}
	// node 必填 [string] => 获取dom节点的id['#idName']名或者class['.className']名，注意：这个dom节点必须是ul
	// // callBack 选填 [function]
	
	var t = $(settingSet.node)
		t.addClass('ztree');
	var setting = {
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: ""
			},
			key: {
				children: "nodes"
			}
		},
		callback: {
			beforeClick: function(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj(treeId);
				zTree.expandNode(treeNode);
				return false;
			},
			onCheck: function(treeId, treeNode) {
				console.log(treeId)
				var zTree = $.fn.zTree.getZTreeObj(treeNode);
				returnData = zTree.getChangeCheckedNodes();
				if (callBack) {
					callBack.call(zTree, zTree.getChangeCheckedNodes())
				}
				return true;
			}
		}
	};
	// 检测需要什么样的结构
	switch (settingSet.type) {
		case 'check':
			setting.check = {
				enable: true,
				nocheckInherit: true
			};
			break;
		case 'radio':
			setting.check = {
				enable: true,
				chkStyle: "radio",
				radioType: "level"
			};
			break;
		default:
			setting.view = {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false,
			expandSpeed: ($.browser.msie && parseInt($.browser.version)<=6)?"":"fast"
		};
	}
	if (setting.check) {
		setting.data.simpleData.autoCheckTrigger =  true
	}
	$.fn.zTree.init(t, setting, settingSet.data);
	
}



