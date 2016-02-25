/**
 * Created by luowei on 2/24/16.
 */
import React from 'react';
import HotTopic from './HotTopic';
;
class topicList extends React.Component {
  render() {
    let topicList = this.props.topicList;
    return (
      <div className="hot-topic-container">
        {topicList && topicList.map(topic => {
          return <HotTopic key={topic.topic.id} {...topic} />
        })}
      </div>
    );
  }
}

export default topicList;