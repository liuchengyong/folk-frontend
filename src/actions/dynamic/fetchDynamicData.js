import config from 'config';
import requestDynamicData from './requestDynamicData';
import receiveDynamicData from './receiveDynamicData';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestDynamicData());
    return fetch(config.apiUrl + '/api/v1/activity/event/' + id +'?page=0&pageSize=3',{
          method: 'GET',
          mode: 'no-cors',
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
             'Accept': 'application/json',
             'code':25,
             'osType':'WEB'
          }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveDynamicData(json)));
  }
}