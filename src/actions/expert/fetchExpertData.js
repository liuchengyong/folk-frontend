import config from 'config';
import requestExpertData from './requestExpertData';
import receiveExpertData from './receiveExpertData';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestExpertData());
    return fetch(config.apiUrl + config.ExpertData + id +'?pageSize=10')
      .then(response => response.json())
      .then(json => dispatch(receiveExpertData(json)));
  }
}