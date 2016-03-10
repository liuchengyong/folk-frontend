/**
 * Created by luowei on 3/3/16.
 */
import config from 'config';
import receiveCoupon from './receiveCoupon';
import requestCoupon from './requestCoupon';

module.exports = (mobile) => {
  return dispatch => {
    dispatch(requestCoupon());
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
          return location.href = response;
        } else {
          return dispatch(receiveCoupon(response));
        }
      });
  }
};