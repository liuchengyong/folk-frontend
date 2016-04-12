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
	if(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(value) && value.length > 1) {
		return true;
	} else {
		return false;
	}
}

/**
 * 验证手机号
 * 规则: 国内手机号 https://github.com/VincentSit/ChinaMobilePhoneNumberRegex
 */

exports.mobile = (value) => {
	if(/(^(13\d|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/.test(value)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 验证验证码
 * 规则: 六位数字
 */
exports.captch = (value) => {
	if(/^[0-9]{6}$/.test(value)) {
		return true;
	} else {
		return false;
	}
}
/**
 * 验证密码
 * 规则: 不少于六位
 */
exports.password = (value) => {
	if(value.length >= 6) {
		return true;
	} else {
		return false;
	}
}