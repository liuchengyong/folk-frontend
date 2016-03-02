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
    let message = this.props.topic.relateMessages;

    let dialog = this.props.dialog;

    if(this.props.topic.isFetching) {
      return <Loading />
    }

    //没有评论
    let _LatestComment = '';
    if(comment.results.length > 0) {
      _LatestComment = <LatestComment comment={comment} dialog={dialog} actions={this.props.actions}/>;
    }

    return (
      <div className="topic-wrapper">
        <TopicDesc topic={topic} expert={expert}/>
        { _LatestComment }
        <LatestMsg message={message}/>
        <Menu dialog={dialog} actions={this.props.actions} />
      </div>
    );
  }

  componentDidMount() {
    this.props.actions.fetchTopicData(this.props.params.id);
  }
}

TopicComponent.defaultProps = {};

export default TopicComponent;