/**
 * 一些公用方法函数
 */

/**
 * toast 提示信息
 * @params	message: 需要显示的信息, sec:显示时间(单位ms, 默认2.5s)
 */
 exports.showToast = (message, sec) => {

 	var s = sec || 1000;
    var contentHtml = '<div class="loading2"><div class="loading-toast">' + message + '</div></div>';

    var el = document.querySelector('body');
    var elChild = document.createElement('div');
	elChild.innerHTML = contentHtml;
	el.insertBefore(elChild, el.firstChild);

    var $toast = document.querySelector('.loading2');
    document.querySelector('.loading-toast').innerHTML = message;
    setTimeout(function() {
        // $toast.remove();
        $toast.parentNode.removeChild( $toast );

    }, s);
}
