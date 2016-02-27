import {default as config} from 'config';
const receiveTopicData = require('./receiveTopicData');
const requestTopicData = require('./requestTopicData');

/**
 * @param	{tid: topic id}
 */
module.exports = function(tid) {
	let url = config.apiUrl + config.TopicData + tid + '?relateTopicNum=0&relateCommentNum=0';

  return dispatch => {
  	dispatch(requestTopicData())
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveTopicData(json)));
  }
};