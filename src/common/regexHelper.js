/**
 * 项目中常用的正则验证
 * @author HuangGuorui
 * @date 4/7 2016
 */


/**
 * 验证用户名
 * 规则: 至少两个字符 && 不包含特殊字符
 */
exports.username = (value) => {
	if(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(value)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 验证手机号
 * 规则: 国内手机号
 */

exports.mobile = (value) => {
	if(/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(value)) {
		console.log('is right');
		return true;
	} else {
		console.log('is wrong');
		return false;
	}
}