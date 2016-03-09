/**
 * 不同屏幕适配
 * 动态设置meta&font-size
 * @author HuangGuorui
 */

/**
 * 动态设置meta属性
 */
exports.setFrontSize = () => {
	console.log('test');
	var deviceWidth = document.documentElement.clientWidth;
	console.log('deviceWidth' + deviceWidth);
	if(deviceWidth > 750) deviceWidth = 750;
	document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}


