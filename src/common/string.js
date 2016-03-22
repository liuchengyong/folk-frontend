/**
 * 字符串的处理的一些公用函数功能
 * @author HGR
 */

/**
 * 字符串截取.
 * @param str: 源字符串, limit:限制长度(默认80)
 */
exports.substring = (str, limit) => {
	var limit = limit || 80;
  if(str.length > limit) {
    return str.substring(0, limit) + '...';
  } else {
    return str;
  }
}
