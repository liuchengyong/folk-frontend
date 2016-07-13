import config from 'config';
import headers from '../globalHeader';
import assign from 'lodash/assign';

module.exports = (answer,unWorth,openId) => {
  return dispatch => {
    let postUrl = config.apiUrl + 
    (unWorth ? '/api/v1/answer/cancel/unworth/weixin/h5' : '/api/v1/answer/unworth/weixin/h5');
    return fetch(postUrl,{
        method: 'Post',
        headers: assign(headers,{'openId':openId}),
        body: 'answerId=' + answer.answer.answerId
      })
      .then(response => response.json())
      .then(json => json.success ? dispatch(updateUnworthData(answer,unWorth)) : '');
  }
}

function updateUnworthData(answer,unWorth){
  if(unWorth){
    answer.answerDetail.unworth = false;
    answer.answer.unworthCount = answer.answer.unworthCountCopy - 1;
  }else{
    answer.answerDetail.unworth = true;
    answer.answer.unworthCount = answer.answer.unworthCountCopy + 1;
  }
  return {type: 'UPDATE_ANSWER_UNWORTH', parameter:answer};
}; 