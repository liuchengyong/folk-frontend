import config from 'config';
import headers from '../globalHeader';

module.exports = (id) => {
  return dispatch => {
    return fetch(config.apiUrl + '/api/v1/question/' + id,{
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(json => json.success ? fetchCommentsData(dispatch,json.param) : '');
  }
}

function fetchCommentsData(dispatch,answer){
    fetch(`${config.apiUrl}/api/v1/answer/comment/list?answerId=${answer.answerId}&page=0&pageSize=5`,{
      method: 'GET',
      headers: headers
    })
    .then(response => response.json())
    .then(json =>  json.success ? dispatch(receiveAnswerData({answer:answer,comments:json.param})):'');
}

function receiveAnswerData(parameter){
  parameter.answer.unworthCountCopy = parameter.answer.unworthCount;
	return {type: 'RECEIVE_ANSWER_DATA', parameter};
}