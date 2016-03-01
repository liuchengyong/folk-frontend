/**
 * 针对时间格式化的一些处理
 * @date 3/1/2016
 * @author	HuangGuorui
 *
 */

/**
 * 讲分钟格式化
 * @param 	duration 	话题时间, 单位分钟
 */
 exports.duration2time = (duration) => {
 	let hour = parseInt(duration / 60);
 	let min = duration % 60;
 	hour = hour > 0 ? hour + '小时' : '';
 	min = min > 0 ? min + '分钟' : '';
 	return '约' + hour + min;
 }