import {default as config} from 'config';
const receiveKeyWordData = require('./receiveKeyWordData');
const requestKeyWordData = require('./requestKeyWordData');
import headers from '../globalHeader';

module.exports = (key) => {
  return dispatch => {
  	dispatch(requestKeyWordData());
    return fetch(config.apiUrl + config.found + key +'&page=0&pageSize=20',{
		method: 'GET',
        headers: headers 
    })
      .then(response => response.json())
      .then(json => dispatch(receiveKeyWordData(json)));
  }
};