require('normalize.css');
require('styles/_topic.scss');

import React from 'react';
import Loading from './Loading';
import TopicDesc from './TopicDesc';
import LatestComment from './LatestComment';
import LatestMsg from './LatestMsg';
import Menu from './Menu';

class TopicComponent extends React.Component {
  render() {

    let topic = this.props.topic.topic;
    let expert = this.props.topic.expert;
    let comment = this.props.topic.comment;
    let dialog = this.props.dialog;

    if(this.props.topic.isFetching) {
      return <Loading />
    }
    return (
      <div className="topic-wrapper">
        <TopicDesc topic={topic} expert={expert}/>
        <LatestComment comment={comment} dialog={dialog} actions={this.props.actions}/>
        <LatestMsg comment={comment}/>
        <Menu />
      </div>
    );
  }

  componentDidMount() {
    this.props.actions.fetchTopicData(this.props.params.id);
  }
}

TopicComponent.defaultProps = {};

export default TopicComponent;