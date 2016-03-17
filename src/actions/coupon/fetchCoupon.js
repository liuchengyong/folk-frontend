/**
 * Created by luowei on 3/3/16.
 */
import config from 'config';
import receiveCoupon from './receiveCoupon';

module.exports = (mobile) => {
  return dispatch => {
    return fetch(config.baseUrl + config.wechatAPI.coupon + location.search, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({mobile: mobile}),
      credentials: 'same-origin'
    })
      .then(response => {
        'use strict';
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(response => {
        'use strict';
        if (typeof response == 'string') {
          switch (response) {
            case '401':
              alert('缺少必要参数');
              break;
            case '502':
              alert('不能获取红包信息');
              break;
            case '403':
              alert('code不合法');
            default:
              location.href = response;
          }
        } else {
          dispatch(receiveCoupon(response));
        }
      });
  }
};