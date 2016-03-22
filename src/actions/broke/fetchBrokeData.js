import config from 'config';
import requestBrokeData from './requestBrokeData';
import receiveBrokeData from './receiveBrokeData';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestBrokeData());
    return fetch(config.apiUrl + config.BrokeData + id + '&page=0&pageSize=10')
      .then(response => response.json())
      .then(response => {

        dispatch(receiveBrokeData(response))
      });
  }
};