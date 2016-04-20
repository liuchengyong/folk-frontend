import config from 'config';
import requestApplyExpert from './requestApplyExpert';
import receiveApplyExpert from './receiveApplyExpert';

var serialize = function (data) {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
};

module.exports = (data) => {

  return dispatch => {
    dispatch(requestApplyExpert());
    return fetch(config.apiUrl + config.applyExpert, {
    	method: 'POST',
			mode: 'cors',
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'
			// 'X-Codingpedia': 'velue',
			// 'Access-Control-Allow-Headers': 'accept, content-type,aa, bb, x-parse-session-token'
			},
			credentials: 'same-origin',
			body: serialize(data)
		})
    .then(response => response.json())
    .then(response => {

      dispatch(receiveApplyExpert(response))
    });
  }
};