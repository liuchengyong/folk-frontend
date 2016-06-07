import config from 'config';
import requestExpertData from './requestExpertData';
import receiveExpertData from './receiveExpertData';
import headers from '../globalHeader';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestExpertData());
    return fetch(config.apiUrl + config.ExpertData + id +'?pageSize=10',{
 		method: 'GET',
        headers: headers
    })
      .then(response => response.json())
      .then(json => dispatch(receiveExpertData(json)));
  }
}