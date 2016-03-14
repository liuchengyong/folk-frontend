import config from 'config';
import requestBrokeData from './requestBrokeData';
import receiveBrokeData from './receiveBrokeData';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestBrokeData());
    return fetch(config.apiUrl + config.BrokeData + id + '&page=0&pageSize=10')
      .then(response => response.json())
      .then(response => {
        // if (response.code == 0) {
        //   var title = '分享个爆料';
        //   var desc = decodeURI(response.param.results[0].comment.content);
        //   var link = '000'; //todo read from config
        //   var imgUrl = 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
        // } else {
        //   var title = '分享个爆料';
        //   var desc = '该爆料已被删除';
        //   var link = '000';
        //   var imgUrl = 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
        // }
        dispatch(receiveBrokeData(response))
      });
  }
};