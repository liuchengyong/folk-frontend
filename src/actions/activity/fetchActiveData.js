import config from 'config';
import requestActiveData from './requestActiveData';
import receiveActiveData from './receiveActiveData';
import headers from '../globalHeader';

module.exports = (id) => {
	return dispatch => {
		dispatch(requestActiveData());
		return fetch(config.apiUrl + config.ActiveData + id + '/ext',{
				method: 'GET',
          		headers: headers
			})
			.then(response => response.json())
			.then(response => {
				dispatch(receiveActiveData(response));
			});
	}
};