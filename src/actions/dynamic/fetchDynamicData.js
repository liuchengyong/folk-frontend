import config from 'config';
import requestDynamicData from './requestDynamicData';
import receiveDynamicData from './receiveDynamicData';
import headers from '../globalHeader';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestDynamicData());
    return fetch(config.apiUrl + '/api/v1/activity/event/' + id +'?page=0&pageSize=3',{
          method: 'GET',
          headers: headers
      })
      .then(response => response.json())
      .then(json => dispatch(receiveDynamicData(json)));
  }
}