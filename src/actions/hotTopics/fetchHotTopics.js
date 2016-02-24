import {default as config} from 'config';
const receiveHotTopics = require('./receiveHotTopics');

module.exports = function() {
  return dispatch => {
    return fetch(config.baseUrl + config.hotTopics)
      .then(response => response.json())
      .then(json => dispatch(receiveHotTopics(json)));
  }
};