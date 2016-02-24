/**
 * Created by luowei on 2/24/16.
 */
import React from 'react';

class HotTopic extends React.Component {
  render() {
    return (
      <div className="hot-topic">
        <div className="hot-topic-title">{this.props.title}</div>
        <div className="hot-topic-desc">{this.props.description}</div>
        <hr/>
      </div>
    );
  }
}

export default HotTopic;