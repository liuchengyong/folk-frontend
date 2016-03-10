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
          return dispatch(receiveWechatConfig(response));
        }
      })
  }
};