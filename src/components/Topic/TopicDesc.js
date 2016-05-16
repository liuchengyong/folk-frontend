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
    let topic = this.props.topic;
    let expert = this.props.expert;
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
          <h1>{stringFramet.decodeString(topic.title)}</h1>
          <span className="order-time">{Time.duration2time(topic.duration)}</span>
        </div>
        <div className="topic-content">
          <p>
            {stringFramet.decodeString(topic.description)}
          </p>
        </div>
          {appointCount}
        <div className="clear"></div>
      </div>
    );
  }
}

export default TopicDesc;