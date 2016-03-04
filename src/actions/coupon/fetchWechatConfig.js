/**
 * Created by luowei on 3/3/16.
 */
import config from 'config';
import receiveWechatConfig from './receiveWechatConfig';
import requestWechatConfig from './requestWechatConfig';

module.exports = () => {
  return dispatch => {
    dispatch(requestWechatConfig());
    return fetch(config.baseUrl + config.wechatAPI.config + location.search, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => dispatch(receiveWechatConfig(json)));
  }
};