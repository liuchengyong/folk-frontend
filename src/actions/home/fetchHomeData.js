import {default as config} from 'config';
const receiveHomeData = require('./receiveHomeData');
const requestHomeData = require('./requestHomeData');

module.exports = function() {
  return dispatch => {
  	dispatch(requestHomeData())
    return fetch(config.apiUrl + config.homeData)
      .then(response => response.json())
      .then(json => dispatch(receiveHomeData(json)));
  }
};