/**
 * Created by luowei on 3/12/16.
 */
import config from 'config';
import receiveConsultation from './receiveConsultation';

module.exports = (id) => {
  return dispatch => {
    return fetch(config.apiUrl + config.Consultation + id +'/ext')
      .then(response => response.json())
      .then(json => dispatch(receiveConsultation(json)));
  }
};