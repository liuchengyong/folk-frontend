/**
 * 针对时间格式化的一些处理
 * @date 3/1/2016
 * @author  HuangGuorui
 *
 */

/**
 * [Format description] 扩充时间的format的方法
 * @param {[type]} fmt [description]
 */
Date.prototype.Format = function(fmt) {
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
};

/**
 * 将分钟格式化
 * @param   duration  话题时间, 单位分钟
 */
 exports.duration2time = (duration) => {
  let hour = parseInt(duration / 60);
  let min = duration % 60;
  hour = hour > 0 ? hour + '小时' : '';
  min = min > 0 ? min + '分钟' : '';
  return '约' + hour + min;
 }


/**
 *  指点统一的时间格式
 * 当年不显示年
 * 通知列表页如果是今天显示今天，
 * 如果是昨天展示昨天，
 * 如果是前天展示前天，
 * 10天之内的显示几天前，
 * 大于10开始展示日期，如果是24小时内，显示几小时前，不足一小时展示多少分钟前
 */
  exports.formateTime = (ts) => {
    let date = null,nowDate = new Date();
    try{
      date = new Date(ts);
    }catch(e){
      return '未知';
    }
    let dayDiff = Math.floor(nowDate.getTime()/(1000 * 60 * 60 * 24)) - Math.floor(date.getTime()/(1000 * 60 * 60 * 24)),
        hourDiff = Math.floor(nowDate.getTime()/(1000 * 60 * 60)) - Math.floor(date.getTime()/(1000 * 60 * 60)),
        minDiff = Math.floor(nowDate.getTime()/(1000 * 60)) - Math.floor(date.getTime()/(1000 * 60));

    if(dayDiff > 10){
      return date.Format('yyyy-MM-dd');
    }else if(dayDiff > 2){
      return `${dayDiff}天前`;
    }else if(dayDiff == 2){
      return '前天';
    }else if(dayDiff == 1){
      return '昨天';
    }else if(hourDiff < 24 && hourDiff >= 1){
      return `${hourDiff}小时前`;
    }else if(minDiff < 60 && minDiff > 1){
      return `${minDiff}分钟前`;
    }else{
      return '1分钟前';
    }
  }


/**
 * 日期标准化
 */
 exports.formateDate = (ts) => {
  try{
    return new Date(ts).Format('yyyy-MM-dd');
  }catch(e){
    return 'unknow';
  }
 }

