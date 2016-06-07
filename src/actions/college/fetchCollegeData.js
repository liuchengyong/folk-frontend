import config from 'config';
import requestCollegeData from './requestCollegeData';
import receiveCollegeData from './receiveCollegeData';
import headers from '../globalHeader';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestCollegeData());
    return fetch(config.apiUrl + '/api/v1/college/' + id +'/detail?page=0&pageSize=3',{
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(json => dispatch(receiveCollegeData(json)));
  }
}