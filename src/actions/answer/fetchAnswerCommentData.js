import config from 'config';
import headers from '../globalHeader';
import assign from 'lodash/assign';

function serialize(data) {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
}

module.exports = (answer,openId,comment) => {
  return dispatch => {
    return fetch(`${config.apiUrl}/api/v1/answer/comment/weixin/h5`,{
        method: 'Post',
        headers: assign(headers,{'openId':openId}),
        body: serialize(comment)
      })
      .then(response => response.json())
      .then(json => json.success ? fetchCommentsData(dispatch,answer) : console.log('评论提交失败'));
  }
}

function fetchCommentsData(dispatch,answer){
    fetch(`${config.apiUrl}/api/v1/answer/comment/list?answerId=${answer.answerId}&page=0&pageSize=5`,{
      method: 'GET',
      headers: headers
    })
    .then(response => response.json())
    .then(json =>{
      // json.success ? dispatch(receiveCommentData({answer:answer,comments:json.param}))
      if(json.success){  
        dispatch(receiveCommentData({answer:answer,comments:json.param}))
      }else{
        console.log('获取评论失败');
      }
    });
}

function receiveCommentData(parameter){
	return {type: 'RECEIVE_COMMENT_DATA', parameter};
}