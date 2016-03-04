/**
 * Created by luowei on 3/3/16.
 */
import config from 'config';

module.exports = () => {
  return dispatch => {
    return fetch(config.baseUrl  + location.search)
      .then(response => response.json())
      .then(json => dispatch(receiveWechatConfig(json)));
  }
};