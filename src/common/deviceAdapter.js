/**
 * 不同屏幕适配
 * 动态设置meta&font-size
 * @author HuangGuorui
 */

/**
 * 动态设置meta属性
 */
exports.setFrontSize = () => {
	var deviceWidth = document.documentElement.clientWidth;
	if(deviceWidth > 750) deviceWidth = 500;
	document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}


