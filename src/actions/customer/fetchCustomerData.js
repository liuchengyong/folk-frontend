import config from 'config';
import headers from '../globalHeader';

module.exports = (userId) => {
  return dispatch => {
    return fetch(config.apiUrl + '/api/v2/user/' + userId,{
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(json => json.code == 0 ? dispatch(receiveCustomerData(json.param)) : '');
  }
}

function receiveCustomerData(parameter){
	return {type: 'RECEIVE_CUSTOMER_DATA', parameter};
}