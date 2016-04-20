import config from 'config';
import requestActiveData from './requestActiveData';
import receiveActiveData from './receiveActiveData';

module.exports = (id) => {
	return dispatch => {
		dispatch(requestActiveData());
		return fetch(config.apiUrl + config.ActiveData + id + '/ext')
			.then(response => response.json())
			.then(response => {
				dispatch(receiveActiveData(response));
			});
	}
};