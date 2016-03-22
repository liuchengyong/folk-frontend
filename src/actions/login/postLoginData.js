// import config from 'config';
import requestLoginData from './requestLoginData';
// import receiveBrokeData from './receiveBrokeData';

module.exports = () => {
  return dispatch => {
    dispatch(requestLoginData());
    // return fetch(config.apiUrl + config.BrokeData + id + '&page=0&pageSize=10')
    //   .then(response => response.json())
    //   .then(response => {
    //     dispatch(receiveBrokeData(response))
    //   });
  }
};