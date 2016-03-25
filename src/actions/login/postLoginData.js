import config from 'config';
import helper from '../../common/helper';
import requestLoginData from './requestLoginData';
import receiveLoginData from './receiveLoginData';

var serialize = function (data) {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
};

/**
 * 发送注册数据
 * @param {data: Object, 注册数据}, 
 * @param {type: boole. true:手机注册, false: 邮箱注册}
 */
module.exports = (data, type) => {
  let registerData = config.LoginByMobile;
  console.log(type);
  if(!type) { 
    registerData = config.LoginByEmail;
  }
  return dispatch => {
    dispatch(requestLoginData());
    return fetch(config.apiUrl + registerData, {
      	method: 'POST',
      	mode: 'cors',
    		headers: {
    		'Content-Type': 'application/x-www-form-urlencoded',
    		'Accept': 'application/json'
    		},
    		credentials: 'same-origin',
    		body: serialize(data)
      })
      .then(response => response.json())
      .then(response => {
        switch (response.code) {
          case 0:
            //跳转到个人中心 || next_url
            dispatch(receiveLoginData(response))
            break;
          case 205: //手机号码已存在
            helper.showToast(response.msg);
          case 206:
            helper.showToast(response.msg);
            break;
          case 207: 
            helper.showToast(response.msg);
            break;
          case 218: //邮箱已存在
            helper.showToast(response.msg);
          case 219: //邮箱未激活
            helper.showToast(response.msg);
            break;
          default: // 203: 无效的用户密码
            helper.showToast(response.msg);
            break;
        }
      });
  }
};
