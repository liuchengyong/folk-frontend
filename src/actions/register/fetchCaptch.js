/**
 * 获取验证码
 */
import config from 'config';
import helper from '../../common/helper';
import requestCaptch from './requestCaptch';
import receiveCaptch from './receiveCaptch';


var serialize = function (data) {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
};

module.exports = (mobile) => {
  return dispatch => {
    dispatch(requestCaptch());
    return fetch(config.apiUrl + config.Captch, {
    	method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        // 'X-Codingpedia': 'velue',
        // 'Access-Control-Allow-Headers': 'accept, content-type,aa, bb, x-parse-session-token'
      },
      credentials: 'same-origin',
      body: serialize({mobile: mobile})
      })
      .then(response => response.json())
      .then(response => {
        switch (response.code) {
          case 205: //手机号码已存在
            helper.showToast(response.msg);
            break;
          case 204: //一分钟只能发送一次
            helper.showToast(response.msg);
            break;
          default:
            dispatch(receiveCaptch(response))
        }
      });
  }
};