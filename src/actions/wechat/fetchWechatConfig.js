/**
 * Created by luowei on 3/3/16.
 */
import config from 'config';
import receiveWechatConfig from './receiveWechatConfig';

module.exports = () => {
  return dispatch => {
    return fetch(config.baseUrl + config.wechatAPI.config + location.search, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(response => dispatch(receiveWechatConfig(response)))
  }
};