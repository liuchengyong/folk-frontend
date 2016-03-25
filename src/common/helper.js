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
        $toast.parentNode.removeChild( $toast );
    }, s);
}

/**
 * cookie to json
 *
 */

// function setCookie(name,idcard,days) {
//     var arr = new Array();
//     var obj = new Object();
 
//     //add new cookie data
//     obj.name = document.getElementById(name).value;
//     obj.idcard = document.getElementById(idcard).value;
//     arr.push(obj);
 
//     //get old cookie data
//     var temp = getCookie();
//     if (temp != null) {
//         //concat new and old cookie data
//         for (var i = 0; i < temp.length; i++) {
//             var ob = new Object();
//             ob.name = temp[i].name;
//             ob.idcard = temp[i].idcard;
//             arr.push(ob);
//         }
//     }
//     var objWarp = new Object();
//     objWarp.user = arr;
//     var val = JSON.stringify(objWarp);
 
//     //set cookie date expired
//     var date = new Date();
//     date.setTime(date.getTime()+(days*24*60*60*1000));
//     var expires = "; expires="+date.toGMTString();
//     //create cookie
//     document.cookie = "user_cookie="+val+expires;
// }

/**
 *  得到用户cookie
 */
exports.getCookie = () => {
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