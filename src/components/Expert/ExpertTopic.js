/**
 * 导师详情 导师话题
 */
import React from 'react';
let pnt_ic = require('../../images/icon/ic_number.png');

class ExpertTopic extends React.Component {

  render() {
   
   let expert = this.props.expert;
   let user = expert.user;
   let expertInfo = expert.expert;
   let topic = expert.topic;

   console.log(topic);
   console.log('------');
   let topicList = topic.map(tp => {

    return (
      <div key={tp.id} className="topics_item">
        <div className="topics_item_top">
            <span className="topics_item_top_title">
                {tp.title}
            </span>
            <span className="topics_item_top_price">
                ￥<span className="topics_item_top_price_num">{tp.amount}</span>/次
            </span>
        </div>
        <div className="topics_item_time">
            <i className="fa fa-clock-o"></i> 约0.5小时
        </div>
        <div className="topics_item_content">
            {tp.description}
        </div>
        <div className="topics_item_request_number">
            <img src={pnt_ic} /> 3人求指点
        </div>
      </div>
    );
   });

    return (
	    <div className="topics">
        <div className="topics_title">
            <span className="topics_title_text">话题</span>
        </div>
        {topicList}
    </div>
    );
  }
}

export default ExpertTopic;