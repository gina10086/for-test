function CONFIG() {
    this.api = 'http://localhost:2348/';
    this.route = [{
        name: 'user',
        text: '用户权限管理',
        url:'info.html',
        children: [
        	{
        		name: 'info',
		        text: '用户管理'
        	},
        	{
        		name: 'setting',
		        text: '角色管理',
		        url:'user/setting.html'
        	},
        	{
        		name: 'promission',
		        text: '权限管理',
		        url:'user/setting.html'
        	}
        ]},
        {
        name: 'organization',
        text: '机构管理',
        url:'info.html',
        children: [
        	{
        		name: 'maintain',
		        text: '机构维护',
		        url:'maintain.html'
        	},
        	{
        		name: 'user',
		        text: '人员管理',
		        url:'user/setting.html'
        	}
        ]},
        {
        name: 'dataSet',
        text: '数据管理',
        url:'info.html',
        children: [
        	{
        		name: 'dialog',
		        text: '日志管理',
		        url:'user/setting.html'
        	},
        	{
        		name: 'dictionary',
		        text: '数据字典维护',
		        url:'user/setting.html'
        	},
        	{
        		name: 'system',
		        text: '系统参数维护',
		        url:'user/setting.html'
        	}
        ]}
    ];
}

