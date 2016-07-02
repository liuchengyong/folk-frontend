import React from 'react';
require('styles/_loading.scss');

const RequestLoading = (obj) => (
	<div className="loading-wrap-text">
		<div className="wrap-bg"></div>	
		<div className="wrap-content">
			<span className="wrap-text">{obj.text}</span>
		</div>
  	</div>
  
);
export default RequestLoading;