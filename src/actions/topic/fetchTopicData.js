import {default as config} from 'config';
const receiveTopicData = require('./receiveTopicData');
const requestTopicData = require('./requestTopicData');
import headers from '../globalHeader';
/**
 * @param	{tid: topic id}
 */
module.exports = function(tid) {
	let url = config.apiUrl + config.TopicData + tid + '?relateTopicNum=3&relateCommentNum=3';

  return dispatch => {
  	dispatch(requestTopicData())
    return fetch(url,{
    	method: 'GET',
        headers: headers
    })
      .then(response => response.json())
      .then(json => dispatch(receiveTopicData(json)));
  }
};