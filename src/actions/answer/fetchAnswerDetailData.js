import config from 'config';
import headers from '../globalHeader';

module.exports = (answerId,openId) => {
  return dispatch => {
    return fetch(config.apiUrl + '/api/v1/answer/' + answerId + '/h5?openId=' + openId,{
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(json => dispatch(receiveAnswerDetailData(json)));
  }
}

function receiveAnswerDetailData(parameter){
  let param = {
    answerDetail:parameter.param || { answer:{description:null} }
  };
	return {type: 'RECEIVE_ANSWER_DETAIL_DATA', parameter:param};
}