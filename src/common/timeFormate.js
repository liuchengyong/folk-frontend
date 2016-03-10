/**
 * 针对时间格式化的一些处理
 * @date 3/1/2016
 * @author	HuangGuorui
 *
 */

/**
 * 将分钟格式化
 * @param 	duration 	话题时间, 单位分钟
 */
 exports.duration2time = (duration) => {
 	let hour = parseInt(duration / 60);
 	let min = duration % 60;
 	hour = hour > 0 ? hour + '小时' : '';
 	min = min > 0 ? min + '分钟' : '';
 	return '约' + hour + min;
 }

 /**
  * 格式化匿名爆料时间
  * 当年不显示年
	* 通知列表页如果是今天显示今天，
	* 如果是昨天展示昨天，
	* 如果是前天展示前天，
	* 10天之内的显示几天前，
	* 大于10开始展示日期，如果是24小时内，显示几小时前，不足一小时展示多少分钟前
  */
 exports.formateBrokeTime = (ts) => {
 	let date = new Date(ts);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const _date = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	let nowDate = new Date();
	let nowYear = date.getFullYear();

	let timeDiff = (nowDate - date); //毫秒

	let hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
	let dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	let minDiff = Math.floor(timeDiff / (1000 * 60));

	if(dayDiff > 10 && nowYear != year) {
	return `${year}/${month}/${_date}`;
	} else if(dayDiff > 10 && nowYear == year) {
	return `${month}/${_date}`;
	}else if( dayDiff >= 2 && dayDiff < 10) {
	return dayDiff  + '天前';
	} else if(dayDiff == 2) {
	return '前天';
	} else if(dayDiff == 1) {
	return '昨天';
	} else if(hourDiff < 24 && hourDiff > 1) {
	return hourDiff + '小时前';
	} else if(minDiff < 60 && minDiff > 1) {
	return minDiff + '分钟前';
	} else {
	return '1分钟前';
	}
 }