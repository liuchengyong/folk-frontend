/**
 *
 * math 方法的扩充
 */


// 强制保留小数
exports.DecimalFormat = function(num,i){
  i = i || 2;
  if(isNaN(num)) return num;
  let s_temp = num.toString();
  let pos_decimal = s_temp.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_temp.length;
    s_temp += '.';
  }
  while (s_temp.length <= pos_decimal + i) {
    s_temp += '0';
  }
  return s_temp;
}