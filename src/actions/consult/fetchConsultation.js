import config from 'config';
import receiveConsultation from './receiveConsultation';
import headers from '../globalHeader';

module.exports = (id) => {
  return dispatch => {
    return fetch(config.apiUrl + config.Consultation + id +'/ext',{
    	method: 'GET',
        headers: headers
    })
      .then(response => response.json())
      .then(json => dispatch(receiveConsultation(json)));
  }
};