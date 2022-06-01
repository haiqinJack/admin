'use strict';
const db = uniCloud.database();
const _ = db.command
exports.main = async (event, context) => {
	let { year, month, date, hour, appointment_user_id} = event
	let res = {}
	//先查询该日期是否有数据，没有则说明当天没人预约，则新增，有就追加数据
	let { data } = await db.collection('appointment').where({year, month, date, hour}).get()
	console.log(data, 'data',data.length < 0)
	if( data.length === 0) {
		console.log('add:',appointment_user_id)
		res = await db.collection('appointment').add({year, month, date, hour, appointment_user_id: [appointment_user_id]})
	}else {
		console.log('push:', appointment_user_id)
		res = await db.collection('appointment').where({
			_id: data[0]._id
		}).update({
			appointment_user_id: _.push(data[0]._id)
		})
	}
	
	return res
};
