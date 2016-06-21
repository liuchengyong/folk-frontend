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
      .then(json => json.success ? fetchCommentsData(dispatch,json.param) : "");
  }
}

//http://test.zhid58.com:8080//api/v1/answer/comment/list?answerId=25452F92-D281-428C-92A5-377E948E13B4&page=0&pageSize=5
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