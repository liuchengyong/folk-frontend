/**
 * 发现.名校,导师,家长
 */

import {default as config} from 'config';
const receiveKeyWordData = require('./receiveKeyWordData');
const requestKeyWordData = require('./requestKeyWordData');

module.exports = (key) => {
  return dispatch => {
  	dispatch(requestKeyWordData());
    return fetch(config.apiUrl + config.found + key +'&page=0&pageSize=20')
      .then(response => response.json())
      .then(json => dispatch(receiveKeyWordData(json)));
  }
};