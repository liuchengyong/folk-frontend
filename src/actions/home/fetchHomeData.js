import {default as config} from 'config';
const receiveHomeData = require('./receiveHomeData');

module.exports = function() {
  return dispatch => {
    return fetch(config.baseUrl + config.homeData)
      .then(response => response.json())
      .then(json => dispatch(receiveHomeData(json)));
  }
};