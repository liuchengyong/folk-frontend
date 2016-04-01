import config from 'config';
import requestToken from './requestToken';
import receiveToken from './receiveToken';

module.exports = () => {
  return dispatch => {
    dispatch(requestToken());
    return fetch(config.apiUrl + config.UploadToken)
      .then(response => response.json())
      .then(response => {
        dispatch(receiveToken(response))
      });
  }
};