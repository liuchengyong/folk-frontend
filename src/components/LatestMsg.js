/**
 * 最新留言组件
 * @author  HuangGuorui
 * @Date    2/29/2016
 */

import React from 'react';

class LatestMsg extends React.Component {
  render() {

    let message = this.props.message.results;//[0];
    let content = null;
    content = (
          <div className="no-message">
          </div>
        );

    if(message) {

      content = message.map(msg => {

      return (
          <div key={msg.comment.id} className="msg-info">
              <div className="comment-user-info">
                <img src={msg.sender.avatar} />
                <div className="msg-text">
                  <div className="msg-name">{msg.sender.name}</div>
                  <div className="msg-time">2016-02-29</div>
                </div>
              </div>
              <div className="msg-content">
                <p>{decodeURI(msg.comment.content)}</p>
              </div>
            </div>
          );
        })

    }

    return (
      <div>
        <div className="msg-wrap">
          <div className="title">最新留言</div>
          { content }
        </div>
      </div>

    );
  }
}

export default LatestMsg;