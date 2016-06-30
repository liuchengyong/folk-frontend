import config from 'config';
import headers from '../globalHeader';

module.exports = (answer,openId) => {
  return dispatch => {
    return fetch(config.apiUrl + '/api/v1/answer/' + answer.answer.answerId + '/h5?openId=' + openId,{
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(json => json.success ? dispatch(receiveAnswerDetailData(json,answer)) : '');
  }
}

function receiveAnswerDetailData(parameter,answer){
  answer.success = parameter.success;
  answer.answerDetail = parameter.param;
	return {type: 'RECEIVE_ANSWER_DETAIL_DATA', parameter:answer};
}