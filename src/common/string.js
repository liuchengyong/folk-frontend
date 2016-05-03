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

/**
 * [description] 院校标签的转换
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
exports.collegeTagsConversion = (value) => {
	switch(value){
		case 'Project985':
			return '985高校';
		case 'Project211':
			return '211高校';
		case 'EduPart':
			return '教育部直属';
		case 'CentralPart':
			return '中央部委';
		case 'AutoEnrol':
			return '自主招生试点';
		case 'PriviteSchool':
			return '私立学校';
		case 'PublicSchool':
			return '公立学校';
		case 'InternationalTopUniversities':
			return '国际顶级院校';
		default :
			return '';	
	}
}

exports.collegeTypeConversion = (value) =>{
	switch(value){
		case 'University':
			return '综合';
		case 'Technology':
			return '理工';
		case 'Forestry':
			return '农林';
		case 'Medical':
			return '医药';
		case 'Normal':
			return '师范';
		case 'Language':
			return '语言';
		case 'Economic':
			return '财经';
		case 'Political':
			return '政法';
		case 'Sport':
			return '体育';
		case 'Art':
			return '艺术';
		case 'Nation':
			return '民族';
		case 'Military':
			return '军事';
		case 'Other':
			return '其他';
		default :
			return '';	
	}
}
