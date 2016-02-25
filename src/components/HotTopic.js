/**
 * Created by luowei on 2/25/16.
 */
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class HotTopic extends React.Component {
  render() {
    let topic = this.props.topic;
    let expert = this.props.expert;
    return (
      <div className="hot-topic">
        <div className="hot-topic-preview">
          <img src={expert.user.avatar} alt="预览"/>
        </div>
        <div className="hot-topic-detail">
          <div className="hot-topic-title">{topic.title}</div>
          <div className="hot-topic-amount">{topic.amount}/次</div>
          <hr/>
          <div className="hot-topic-person">
            <div className="hot-topic-user-name">{expert.user.name} | {expert.user.position}</div>
            <div>{expert.user.orgName}</div>
          </div>
        </div>
        <RaisedButton label="Default"/>
        <hr/>
      </div>
    )
  }
}

export default HotTopic;