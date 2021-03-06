export default [{
	value: '今天',
	contrast: '昨天'
}, {
	field: 'appid',
	title: 'APPID',
	tooltip: '',
}, {
	field: 'name',
	title: '应用名',
	tooltip: '',
}, {
	field: 'new_device_count',
	title: '新增设备',
	tooltip: '首次访问应用的设备数（以设备为判断标准，去重）',
	value: 0,
	contrast: 0
}, {
	field: 'active_device_count',
	title: '活跃设备',
	tooltip: '访问过应用内任意页面的总设备数（去重）',
	value: 0,
	contrast: 0
}, {
	field: 'page_visit_count',
	title: '访问次数',
	tooltip: '访问过应用内任意页面总次数，多个页面之间跳转、同一页面的重复访问计为多次访问',
	value: 0,
	contrast: 0
}, {
	field: 'total_devices',
	title: '总设备数',
	tooltip: '从添加统计到当前选择时间的总设备数（去重）',
	value: 0,
	contrast: 0,
}]
