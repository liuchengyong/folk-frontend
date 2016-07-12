import config from 'config';
import headers from '../globalHeader';
import assign from 'lodash/assign';

module.exports = (openId,page,pageSize) => {
  return dispatch => {
    return fetch(config.apiUrl + '/api/v1/payment/list/weixin/h5?page='+ page +'&pageSize='+ pageSize,{
        method: 'GET',
        headers: assign(headers,{openId:openId})
      })
      .then(response => response.json())
      .then(json => json.success ? dispatch(receiveAnswerListOfMeData(pageSize,{answerList:json.param})) : '');
  }
}

function receiveAnswerListOfMeData(pageSize,parameter){
	parameter.answerList.pageSize = pageSize;
	parameter.pageType = 'melist';
	return {type: 'RECEIVE_ANSWER_LIST_DATA', parameter};
}

