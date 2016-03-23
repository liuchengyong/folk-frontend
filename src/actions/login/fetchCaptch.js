/**
 * 获取验证码
 */
import config from 'config';
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
        'Accept': 'application/json'
      },
      credentials: 'same-origin',
      body: serialize({mobile: mobile})
      })
      .then(response => response.json())
      .then(response => {
        dispatch(receiveCaptch(response))
      });
  }
};