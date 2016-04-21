import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';

class TopicItem extends React.Component {
  render() {

    let topics = this.props.active.topics;

    // let topic = null;
    let topicItem = topics.map(topic => {
      var _topic = topic.topic;
      var expert = topic.expert.expert;
      var user = topic.expert.user;
      console.log(user);

      var role = (expert.role == 'STUDENT') ? '名校' : '名师';

      return (
        <div key={_topic.id} className="topic-item">
          <div className="item-header">
            <div className="avatar">
              <img className="avatar-img" src={user.avatar} />
            </div>
            <div className="user" >
              <span className="name">{user.name}</span>
              <span className="ver-line">|</span>
              <span className="expert-title">
                {expert.title}
              </span>
            </div>
          </div>
          <div className="topic-main">
            <span className="role-wrap">
              <span className="role">{role}</span>
            </span>
            <div className="content">
              <span className="title">{_topic.title}</span>
              <div className="view"><i></i>{topic.expert.views}人浏览过</div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="topic-group">
        {topicItem}
      </div>
    );
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
  }
}

export default TopicItem;