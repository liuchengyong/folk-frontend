import config from 'config';
import headers from '../globalHeader';

module.exports = (answer,openId) => {
  return dispatch => {
    return fetch(config.apiUrl + '/api/v1/answer/' + answer.answer.answerId + '/h5?openId=' + openId,{
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(json => dispatch(receiveAnswerDetailData(json,answer)));
  }
}

function receiveAnswerDetailData(parameter,answer){
  answer.success = true;
  answer.answerDetail = parameter.param || { answer:{description:null} };
	return {type: 'RECEIVE_ANSWER_DETAIL_DATA', parameter:answer};
}