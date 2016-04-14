import config from 'config';
import requestVerifyExpert from './requestVerifyExpert';
import receiveVerifyExpert from './receiveVerifyExpert';

var serialize = function (data) {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
};

module.exports = (mobile) => {
  return dispatch => {
    dispatch(requestVerifyExpert());
    return fetch(config.apiUrl + config.verifyExpert, {
    	method: 'POST',
			mode: 'cors',
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json',
			// 'X-Codingpedia': 'velue',
			// 'Access-Control-Allow-Headers': 'accept, content-type,aa, bb, x-parse-session-token'
			},
			credentials: 'same-origin',
			body: serialize({mobile: mobile})
		})
    .then(response => response.json())
    .then(response => {

      dispatch(receiveVerifyExpert(response))
    });
  }
};