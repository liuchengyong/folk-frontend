require('normalize.css');
require('styles/App.scss');

import React from 'react';
//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="notice" onClick={() => this.props.actions.fetchHotTopics()}>{this.props.hotTopics.name}</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
