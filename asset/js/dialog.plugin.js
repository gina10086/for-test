function createDialog(dom,buttons) {
	//dom [dom Object] [dom string]
	//buttons [Array] => [{name[string必填],callBack[function选填，默认关闭dialog]，class[string 选填]},....]
	var dialog = document.getElementById('dialog');
		dialog.className = 'dialog_box';
	var dialogContainer = document.createElement('div');
		dialogContainer.className = 'dialog',
		_this = this;
	this.close = function(e) {
		var e = e || window.event;
		dialog.style.display = 'none';
		if(e.stopPropagation) e.stopPropagation();
		window.event.cancelBubble = true;
		return _this;
	}
	this.show = function(e) {
		var e = e || window.event;
		dialog.style.display = 'flex';
		if(window.navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.") {
			dialog.style.display = 'block';
		}
		if(e.stopPropagation) e.stopPropagation();
		window.event.cancelBubble = true;
		return _this;
	}
	this.createDom = function() {
		dialog.innerHTML = '';
		if((typeof dom).toLowerCase() == 'string') {
			dialogContainer.innerHTML = dom;
		} else {
			dialogContainer.appendChild(dom);
		}
		var div = document.createElement('div');
			div.className = 'btn_box';
		if(buttons && typeof buttons == 'object' && buttons.length > 0) {
			for (var i = 0; i < buttons.length; i++) {
				var button = buttons[i];
				var btn = document.createElement('button');
					btn.className = 'button ' + ((button.class) ? button.class : '');
					btn.innerHTML = button.name || '未命名';
				div.appendChild(btn);
				if (button.callBack) {
					(function(btn,button){
						btn.onclick = function(){
							console.log(button)
							button.callBack(_this, btn);
						};
					})(btn,button)
				} else {
					btn.onclick = this.close;
				}
			}
		} else {
			var closeBtn = document.createElement('button');
				closeBtn.className = 'button cancel';
				closeBtn.innerHTML = '取消';
			closeBtn.onclick = this.close;
			div.appendChild(closeBtn);
		}
		dialogContainer.appendChild(div);
		dialog.appendChild(dialogContainer);
		return _this;
	}

}