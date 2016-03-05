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
      body: JSON.stringify({ mobile: mobile }),
      credentials: 'same-origin'
    })
      .then(response => {
        "use strict";
        return response.json();
      })
      .then(json => dispatch(receiveCoupon(json)));
  }
};