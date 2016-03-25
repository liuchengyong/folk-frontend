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
}

AppComponent.defaultProps = {};

export default AppComponent;