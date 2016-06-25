/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
import TopicDetail from './TopicDetail';


const Topics = (props) => (
  <div className='talkbox' id='topicsbox'>
    <div className='talk-title'>
      <span>导师推荐</span>
    </div>
    {(() => {
      return props.topics.map((topic, index) => { return <TopicDetail key={index} {...topic} />})
    })()}
  </div>
);
export default Topics;
