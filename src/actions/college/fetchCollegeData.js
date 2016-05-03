import config from 'config';
import requestCollegeData from './requestCollegeData';
import receiveCollegeData from './receiveCollegeData';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestCollegeData());
    return fetch(config.apiUrl + '/api/v1/college/' + id +'/detail?page=0&pageSize=3',{
          method: 'GET',
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
             'Accept': 'application/json',
             'code':25,
             'osType':'WEB'
          }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveCollegeData(json)));
  }
}