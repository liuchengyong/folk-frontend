import config from 'config';

module.exports = () => {
	return dispatch => {
		return fetch(config.baseUrl + config.wechatAPI.base + location.search,{
				method: 'Post',
          		headers: {
          			'Content-Type':'application/x-www-form-urlencoded'
          		},
          		body:`url=${location.href}`
			})
			.then(response => response.json())
			.then(data => dealWithData(data,dispatch));
	}
};

function dealWithData(response,dispatch){
	switch (response.code) {
      case '403':
        location.href = response.href;
        break;
      case '405':
        alert('不能获取微信的基本信息');
        break;
      default:
      	dispatch({type: 'RECEIVE_USER_DATA', parameter:response});
  	}
}
