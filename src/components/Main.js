require('normalize.css');
require('styles/App.scss');

import React from 'react';
import HotTopic from './HotTopic';

//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    let topicList = this.props.home.topicList;
    return (
      <div className="index">
        {topicList && topicList.map(list => {
          let topic = list.topic;
          return <HotTopic key={topic.id} {...topic}/>;
        })}
      </div>
    );
  }

  componentDidMount() {
    this.props.actions.fetchHomeData();
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
