require('normalize.css');
require('styles/App.scss');

import React from 'react';
import TopicList from './TopicList';
import Banner from './Banner';
import RecommendExpert from './RecommendExpert';
import Loading from './Common/Loading';

class AppComponent extends React.Component {
  render() {
    let articleList = this.props.home.articleList;
    let expertList = this.props.home.expertList;

    if(this.props.home.isFetching) {
      return <Loading />
    }
    return (
      <div className="index">
        {articleList && articleList.map(list => {
          return <Banner key={list.id} {...list} />
        })}
        { expertList && expertList.map(list => {
          return <RecommendExpert key={list.user.id} {...list} />
        })}
        <TopicList topicList={this.props.home.topicList}/>;
      </div>
    );
  }

  componentDidMount() {
    this.props.actions.fetchHomeData();
  }
}

AppComponent.defaultProps = {};

export default AppComponent;