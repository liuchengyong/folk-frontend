import config from 'config';
import headers from '../globalHeader';

module.exports = (id) => {
  return dispatch => {
    dispatch(requestAnswerData());
    return fetch(config.apiUrl + '/api/v1/question/' + id,{
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(json => json.success ? fetchCommentsData(dispatch,json.param) : '');
  }
}

function fetchCommentsData(dispatch,answer){
    fetch(`${config.apiUrl}/api/v1/answer/comment/list?answerId=${answer.answerId}&page=0&pageSize=3`,{
      method: 'GET',
      headers: headers
    })
    .then(response => response.json())
    .then(json => dispatch(receiveAnswerData({success:json.success,answer:answer,comments:json.param})));
}

function requestAnswerData(parameter){
	return {type: 'REQUEST_ANSWER_DATA', parameter};
}

function receiveAnswerData(parameter){
	return {type: 'RECEIVE_ANSWER_DATA', parameter};
}