/**
 * Created by luowei on 3/3/16.
 */
import {default as config} from 'config';
import receiveWechatConfig from './receiveWechatConfig';
import requestWechatConfig from './requestWechatConfig';

module.exports = (key) => {
  return dispatch => {
    dispatch(requestWechatConfig());
    return fetch(config.wechatServer + 'wechat/config')
      .then(response => response.json())
      .then(json => dispatch(receiveWechatConfig(json)));
  }
};