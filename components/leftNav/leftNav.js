var dataCrumbs = '';
// 生成nav
var config = new CONFIG(),
	route = config.route;
var navHtml = '';// nav里面的ul和tit
for (var i = 0; i < route.length; i++){
	var parent = route[i],
		children = parent.children || null;
	navHtml+= '<div class=\"menu_tit\"><span class=\"icon\"></span>' + parent.text + '</div>';
	if (children) {
		navHtml+= '<ul class=\"menu_list\">';
		for (var ii = 0; ii < children.length; ii++){
			var child = children[ii];
			navHtml+= '<li>'+
                  '<a href=\"#' + parent.name + '/' + child.name +'\" data-crumbs=\"' + parent.text + '|' + child.text + '\">' +
                   child.text +
                   '</a>' +
                   '</li>';
		}
		navHtml+= '</ul>';
	}
}


function computedHeight () {// 计算body的高度
	var minH = $('#nav_box').height(),
		bodyH = $('body').height(),
		maxH = bodyH-56;
	var css = {};
	css['min-height'] = (maxH < minH ? minH : maxH) + 'px';
	$('#container_box').css(css);
	$('#container_loadding').css(css);// loadding的高度
}
var ajaxContainer = $.ajax();// #container的ajax请求
var timer = null;

function resoveHash () {
	crumbsInfo = [];
	var hash = location.hash || '#user/info',// 计算hash
		url = hash.replace('#', '');
	var crumbsArray = url.split('/');
	
		url = url + '.html';
	// 解析hash为crumbs
	for (var i = 0; i < route.length; i++) {
		var p = route[i];
		if ( p.name == crumbsArray[0]) {
			crumbsInfo[0] = p.text;
			for ( var ii = 0; ii < p.children.length; ii++) {
				var c = p.children[ii];
				if ( c.name == crumbsArray[1] ) {
					crumbsInfo[1] = c.text;
					break;
				}
			}
		}
	}
	var crumbs = '<div class=\"crumbs\">当前位置：'+
    				'<span>系统管理</span>'+
    				'<span>'+ crumbsInfo[0] +'</span>'+
    				'<span>'+ crumbsInfo[1] +'</span></div>';
    console.log(dataCrumbs)
	var html = crumbs + '<div class=\"content404\"><p>您访问的页面正在创建中....</p></div>';
	ajaxContainer = $.ajax({
		url: url,
		dataType: "html",
		success: function(data) {
			var reg = /([^\s])/g;
			
			$('#container_loadding').css({'display': 'none'})
	        if(reg.test(data)) {
	        	html=crumbs +data
	        }
	        $("#container").html(html)
	        ajaxContainer.abort()
		},
		timeout: 10000,
		error: function(data) {
			if(data.status == 404) {
				$('#container_loadding').css({'display': 'none'});
				$("#container").html(html)
			}
		}
	});
}
// 解析nav的状态
function navSet() {
	var hash = location.hash,
		n = 0;
	var navs = $('#nav').find('a');
	navs.each(function(){
		if ($(this).attr('href') == hash){
			$(this).addClass('active');
		}
	})

}
$(document).ready(function(){
	$('#nav').html(navHtml);
	resoveHash ();
	navSet();
	var navs = $('#nav').find('a');
	if (location.hash.length == 0) {
		$('#nav').find('a').eq(0).addClass('active');
	}
	// 所有的nav > a 加事件
	navs.on('click', function(e) {
		clearTimeout(timer);
		ajaxContainer.abort();// 停止上一个ajax请求
		var _this = $(this);
		dataCrumbs = _this.attr('data-crumbs');		
		timer = setTimeout(function(){
			navs.each(function(){
				$(this).removeClass('active')
			})
			_this.addClass('active');
			$("#container").html('')
			$('#container_loadding').css({'display': 'block'});
			resoveHash();
			clearInterval(timer);
		}, 150)
	})
	computedHeight();
	$(window).resize(function(){
		computedHeight()
	});
	$('.left_nav_contrl').click(function(){
		var w = 0;
		if($(this).hasClass('close')) {
			$(this).removeClass('close');
			w = 262;
		} else {
			$(this).addClass('close');
		}
		$('#nav_box').css({
			width: w + 'px'
		})
		$('#container_box').css({
			'padding-left': w + 'px'
		})
	})
})