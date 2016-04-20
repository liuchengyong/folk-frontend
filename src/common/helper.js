/**
 * 一些公用方法函数
 */
import assign from 'lodash/assign';
/**
 * toast 提示信息
 * @params	message: 需要显示的信息, sec:显示时间(单位ms, 默认2.5s)
 */
 var showToast = (message, sec) => {

 	var s = sec || 1000;
  var contentHtml = '<div class="loading2"><div class="loading-toast">' + message + '</div></div>';

  var el = document.querySelector('body');
  var elChild = document.createElement('div');
	elChild.innerHTML = contentHtml;
	el.insertBefore(elChild, el.firstChild);

    var $toast = document.querySelector('.loading2');
    document.querySelector('.loading-toast').innerHTML = message;
    setTimeout(function() {
        $toast.parentNode.removeChild( $toast );
    }, s);
  }

/**
 *  得到用户cookie
 */
var getCookie = () => {
    var key,val,res;
    //get all cookie
    var oldCookie = document.cookie.split(';');
    for (var i = 0; i < oldCookie.length; i++) {
        key = oldCookie[i].substr(0,oldCookie[i].indexOf('='));
        val = oldCookie[i].substr(oldCookie[i].indexOf('=')+1);
        key = key.replace(/^\s+|\s+$/g,'');
        //find "user_cookie"
        if(key == 'user_cookie') {
            res = val;
        }
    }
    if (res == undefined) {
        return null;
    } else {
        res = JSON.parse(res);
        return res.user;
    }
}

//localStorage
var save2Local = (k, v) => {
  var oldData = getFromLocal(k);
  var newData = assign(oldData, v);
  var data = JSON.stringify(newData);
  window.localStorage.setItem(k, data);

}
var getFromLocal = (k) => {
  var data = window.localStorage.getItem(k);
  return JSON.parse(data);
}
module.exports = {
  showToast : showToast,
  getCookie: getCookie,
  save2Local: save2Local,
  getFromLocal: getFromLocal
}

// exports.getChildValue = (parentKey, childKey) => {
//   console.log(this)
//   return this.refs[parentKey].refs[key].value.trim()
// }
// single file exports default
// 0: -, default
// 1: =
// 2: ^

// true: single
// false: double

// l(1, data, 0)
exports.l = (data, type, line) => {
  var type = type || 0;
  switch (type) {
    case 0 :
      middleLine(data, line);
      break;
    default:
      middleLine(data, line);
  }
}

var middleLine = (data, line) => {
  if(line) {
    // console.log('-------------------');
    // console.log(data);
  } else {
    // console.log('===================');
    // console.log(data);
  }
}