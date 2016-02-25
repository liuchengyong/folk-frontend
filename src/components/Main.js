require('normalize.css');
require('styles/App.scss');

import React from 'react';
import TopicList from './TopicList';
import Banner from './Banner';
import RecommendExpert from './RecommendExpert';

//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    console.log(this.props);
    let articleList = this.props.home.articleList;
    let expertList = this.props.home.expertList;
    return (
      <div className="index">
        {articleList && articleList.map(list => {
          return <Banner key={list.id} {...list} />
        })}
        { expertList && expertList.map(list => {
          return <RecommendExpert key={list.user.id} {...list} />
        })}
        <TopicList topicList={this.props.home.topicList}/>;
        {}
      </div>
    );
  }

  componentDidMount() {
    this.props.actions.fetchHomeData();
  }
}

AppComponent.defaultProps = {};

export default AppComponent;