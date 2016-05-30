import {default as config} from 'config';
const receiveHomeData = require('./receiveHomeData');
const requestHomeData = require('./requestHomeData');
import headers from '../globalHeader';

module.exports = function() {
  return dispatch => {
  	dispatch(requestHomeData());
    return fetch(config.apiUrl + config.homeData,{
    	method: 'GET',
        headers: headers 
    })
      .then(response => response.json())
      .then(json => dispatch(receiveHomeData(json)));
  }
};