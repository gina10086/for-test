function server (setting) {// setting[Object] => $.ajax(setting)
	var type = setting.type || 'GET',
		typeData = setting.typeData || 'json',
		url = setting.url || null;
	if (typeof setting == 'string') {
		url = setting;
	}
	var returnData = null
	if (url){
		$.ajax({
			type: type,
			typeData: typeData,
			url: url,
			success: function(data) {
				callBack.call(this, data)
			}
		})
	} else {
		console.log('请输入正确的请求地址！')
	}
}