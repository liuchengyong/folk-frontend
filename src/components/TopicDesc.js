/**
 * 导师详情,头部组件
 * Created by HuangGuorui on 2/26/16.
 */
import React from 'react';
// import ''

class Banner extends React.Component {
  render() {

    let topic = this.props.topic;
    let expert = this.props.expert;

    return (
      <div className="topic-desc">
        <div className="desc-header">
          <div className="expert-info">
            <div className="price">
              <span className="order-price">¥1/次</span>
            </div>
            <img className="expert-avatar" src={expert.user.avatar} />
            <div className="expert-text">
                <div className="expert-name">{expert.user.name}</div>
                <div className="expert-school">{expert.user.educationList[0].college.name}</div>
            </div>

          </div>
        </div>
        <div className="title">
          <h1>{topic.title}</h1>
          <span className="order-time">约1小时</span>
        </div>
        <div className="topic-content">
          <p>
            {topic.description}
          </p>
        </div>

        <div className="order-count">
          3人求指点
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default Banner;