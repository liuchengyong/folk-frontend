require('normalize.css');
require('styles/App.scss');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="main-container">
        {this.props.children}
      </div>
    );
  }
  componentWillMount(){
  	let ua = navigator.userAgent.toLowerCase(),
  		loca =  this.props.location.pathname;
    if (ua.match(/MicroMessenger/i) == 'micromessenger' &&
    	loca.match(/answer/i) == 'answer') {
		  this.props.actions.fetchWeixinData();
    }
  }
}

AppComponent.defaultProps = {};

export default AppComponent;