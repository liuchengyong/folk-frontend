import config from 'config';
import requestToken from './requestToken';
import receiveToken from './receiveToken';
import headers from '../globalHeader';

module.exports = () => {
  return dispatch => {
    dispatch(requestToken());
    return fetch(config.apiUrl + config.UploadToken,{
    	method: 'GET',
        headers: headers
    })
      .then(response => response.json())
      .then(response => {
        dispatch(receiveToken(response))
      });
  }
};