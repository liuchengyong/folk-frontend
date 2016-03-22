/**
 * 获取验证码
 */
import config from 'config';
import requestCaptch from './requestCaptch';
import receiveCaptch from './receiveCaptch';

module.exports = (mobile) => {
  return dispatch => {
    // dispatch(requestCaptch());
    console.log(mobile);
    return fetch(config.apiUrl + config.Captch, {
    	method: 'post',
      body: {mobile: mobile}
    })
      .then(response => response.json())
      .then(response => {
        dispatch(receiveCaptch(response))
      });
  }
};