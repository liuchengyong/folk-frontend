import config from 'config';
import requestBrokeData from './requestBrokeData';
import receiveBrokeData from './receiveBrokeData';
import headers from '../globalHeader';
module.exports = (id) => {
  return dispatch => {
    dispatch(requestBrokeData());
    return fetch(config.apiUrl + config.BrokeData + id + '&page=0&pageSize=10',{
    	method: 'GET',
        headers: headers
    })
      .then(response => response.json())
      .then(response => {
        dispatch(receiveBrokeData(response))
      });
  }
};