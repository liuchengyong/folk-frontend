/**
 * code utile, ex chinese,#,/,=,?,&
 * @author HGR
 */

/**
 * encode
 * 
 * @param str: 源字符串, limit:限制长度(默认80)
 */
exports.deCode_text = (str) => {
	return decodeURIComponent(str);
}