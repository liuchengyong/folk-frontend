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

function clickUnWorthData(answer){
  answer.isClickUnWorth = true;
  return {type: 'UPDATE_ANSWER_UNWORTH', parameter:answer};
}

function updateUnworthData(answer,unWorth){
  if(unWorth){
    answer.answer.unworthCount--;
    answer.answerDetail.unworth = false;
  }else{
    answer.answer.unworthCount ++;
    answer.answerDetail.unworth = true;
  }
  answer.isClickUnWorth = false;
  return {type: 'UPDATE_ANSWER_UNWORTH', parameter:answer};
}; 