require('normalize.css');
require('styles/App.scss');

import React from 'react';
import HotTopic from './HotTopic';
import Banner from './Banner';

//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
          {this.props.home.topicList.map(list => {
            let topic = list.topic;
            return <HotTopic key={topic.id} {...topic} />;
          })}
         {this.props.home.articleList.map(list => {
                return <Banner key={list.id} {...list} />
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