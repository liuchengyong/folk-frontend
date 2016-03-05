/**
 * Created by luowei on 3/3/16.
 */
import config from 'config';
import receiveCoupon from './receiveCoupon';
import requestCoupon from './requestCoupon';

module.exports = (body) => {
  return dispatch => {
    dispatch(requestCoupon());
    return fetch(config.baseUrl + config.wechatAPI.coupon, {
      method: 'post',
      body: body,
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveCoupon(json)));
  }
};