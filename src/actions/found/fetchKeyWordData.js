/**
 * 发现.名校,导师,家长
 */

import {default as config} from 'config';
const receiveKeyWordData = require('./receiveKeyWordData');

module.exports = function(key) {
  return dispatch => {
    return fetch(config.apiUrl + config.hotSchoolData + key +'&page=0&pageSize=20')
      .then(response => response.json())
      .then(json => dispatch(receiveHotSchoolData(json)));
  }
};