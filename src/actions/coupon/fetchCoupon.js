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
      .then(response => response.json())
      .then(response => {
        'use strict';
        switch (response.code) {
          case '401':
            alert('缺少必要参数');
            break;
          case '502':
            alert('不能获取红包信息');
            break;
          case '405':
            alert('无效code');
            break;
          case '403':
            location.href = response.href;
          default:
            dispatch(receiveCoupon(response));
        }
      });
  }
};