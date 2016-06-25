import config from 'config';
import headers from '../globalHeader';

module.exports = (id) => {
  return dispatch => {
    return fetch(config.apiUrl + config.Consultation + id +'/ext',{
    	method: 'GET',
        headers: headers
    })
      .then(response => response.json())
      .then(json => json.success ? fetchConsultationComment(json.param,dispatch) : '');
  }
};
function fetchConsultationComment(data,dispatch){
	fetch(config.apiUrl + '/api/v1/article/comment/list?articleId=' +data.article.id +'&page=0&pageSize=5',{
    	method: 'GET',
        headers: headers
    }).then(response => response.json())
    .then(json => json.success ? dispatch(receiveConsultation(data,json.param)):'');
}

function receiveConsultation(article,comment){
	article.comments = comment;
	return {type: 'RECEIVE_CONSULTATION',parameter:article};
}