import config from 'config';
import requestCollegeCountry from './requestCollegeCountry';
import receiveCollegeCountry from './receiveCollegeCountry';

module.exports = (country) => {
  return dispatch => {
    dispatch(requestCollegeCountry());
    return fetch(config.apiUrl + config.fetchCollegeByCountry + country)
      .then(response => response.json())
      .then(response => {
        dispatch(receiveCollegeCountry(response))
      });
  }
};