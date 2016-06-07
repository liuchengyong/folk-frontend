/**
 * 导师详情,头部组件
 * Created by HuangGuorui on 2/26/16.
 */
import React from 'react';
import Time from '../../common/timeFormate';
import stringFramet from '../../common/string';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class TopicDesc extends React.Component {
  render() {
    let topic = this.props.topic,
        expert = this.props.expert,
        tags = this.props.tags.subtag;
    //是否显示求指点
    let appointCount = null;
    if(topic.appointmentTimes > 0) {
      appointCount  = (
          <div className="order-count">
            {topic.appointmentTimes}人求指点
          </div>
        );
    }
    return (
      <div className="topic-desc">
        <div className="topic-tag">
         {tags.map((str,i)=>{
            return i > 3 ? null : <span key={i}>{str}</span>;
         })}
        </div>
        <div className="desc-header">
          <div className="expert-info">
            <div className="price">
              <span className="order-price">{topic.amount > 0? '¥'+topic.amount+'/次' : '免费'}</span>
            </div>
            <img className="expert-avatar" src={ expert.user.avatar || ic_me_avatar_default} />
            <div className="expert-text">
                <div className="expert-name">{ stringFramet.decodeString(expert.user.name || expert.user.loginName || '匿名' )}</div>
                <div className="expert-school">{expert.user.educationList[0] ? expert.user.educationList[0].college.name : (expert.expert.title ? expert.expert.title : '')}</div>
            </div>

          </div>
        </div>
        <div className="title">
          <span className="order-title">{stringFramet.decodeString(topic.title)}</span>
          <span className="order-time">{Time.duration2time(topic.duration)}</span>
          <span className="order-num">{topic.appointmentTimes+'人求指点'}</span>
        </div>
        <div className="topic-content">
          <p dangerouslySetInnerHTML={{__html:topic.description}}>
          </p>
        </div>
          {appointCount}
        <div className="clear"></div>
      </div>
    );
  }
}

export default TopicDesc;