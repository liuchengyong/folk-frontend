import config from 'config';
import headers from '../globalHeader';

module.exports = (id) => {
  return dispatch => {
    return fetch(config.apiUrl + config.ExpertData + id,{
 		method: 'GET',
        headers: headers
    })
      .then(response => response.json())
      .then(json => json.success ? fetchExpertDynamicData(json.param,id,dispatch) : '');
  }
}

function fetchExpertDynamicData(param,id,dispatch){
	fetch(config.apiUrl + `/api/v1/activity/list/event/user?userId=${id}&page=0&pageSize=5`,{
 		method: 'GET',
        headers: headers
    }).then(response => response.json())
      .then(json => json.success ? dispatch(receiveExpertData(param,json.param)) : '');
}

function receiveExpertData(expert,dynamic){
	expert.dynamics = dynamic;
	return {type: 'RECEIVE_EXPERT_DATA', parameter: expert};
}