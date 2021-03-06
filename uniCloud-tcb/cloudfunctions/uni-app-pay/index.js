'use strict';
const unipay = require('uni-pay')
let uniID = require('uni-id')
exports.main = async (event, context) => {
	uniID = uniID.createInstance({
		context
	})
	const {
		action,
		params,
		uniIdToken
	} = event;
	let payload = await uniID.checkToken(uniIdToken)
	console.log(payload, 'payload')
	//event为客户端上传的参数
	let res = {}
	switch (action) {
		case 'wxpayJSAPI':
			const unipayIns = unipay.initWeixin({
				appId: 'wx3c6187fcebb1fd68',
				mchId: '1563733371',
				key: 'zxcvbnmasdfghjklqwertyuiop123456'
			})
			console.log(payload.userInfo.wx_openid['mp-weixin'], 'unipayIns---')
			let outTradeNo = new Date().getTime()
			res = await unipayIns.getOrderInfo({
				openid: payload.userInfo.wx_openid['mp-weixin'],
				body: '夏天的风宠物生活馆',
				outTradeNo,
				totalFee: params.totalFee,
				notifyUrl: 'https://tcb-ssoq9dzreb9d64-2db28d051a177.service.tcloudbase.com/pay-cb',
				spbillCreateIp: context.CLIENTIP
			})
			res.outTradeNo = outTradeNo
			res.totalFee = params.totalFee
		break;
	}
	
	//返回数据给客户端
	return res
};
