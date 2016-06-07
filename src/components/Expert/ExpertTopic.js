/**
 * 导师详情 导师话题
 */
import React from 'react';
import classNames from 'classnames';
import Time from '../../common/timeFormate';

let pnt_ic = require('../../images/icon/ic_number.png');

class ExpertTopic extends React.Component {
  getContent(str){
    str = str.replace(/<[^>]+>/g,'')
              .replace(/&gt;/g,'>')
              .replace(/&lt;/g,'<')
              .replace(/&nbsp;/g,' ')
              .replace(/&amp;/g,'&');
    return str.length > 120 ? (str.substring(0,117) + '...') : str;
  }

  render() {
   
   let expert = this.props.expert;
   let topic = expert.topic;

   let topicList = topic.map(tp => {
   let times = tp.appointmentTimes;
   let topic_item = classNames({
    topics_item: true,
    'topics_item--nonumber': times <= 0
   })
    return (
      <div key={tp.id} className={topic_item}>
        <div className="topics_item_top">
            <span className="topics_item_top_title">
                {tp.title}
            </span>
            <span className="topics_item_top_price">
                ￥<span className="topics_item_top_price_num">{tp.amount}</span>/次
            </span>
        </div>
        <div className="topics_item_time">
            {Time.duration2time(tp.duration)}
        </div>
        <div className="topics_item_content">
            {this.getContent(tp.description)}
        </div>
        <div className="topics_item_request_number">
            <img src={pnt_ic} /> {times}人求指点
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