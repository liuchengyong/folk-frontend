/**
 * 最新留言组件
 * @author  HuangGuorui
 * @Date    2/29/2016
 */

import React from 'react';

class LatestMsg extends React.Component {
  render() {

    let comment = this.props.message.results[0];
    
    let content = (
          <div className="no-message">
          </div>
        );


    if(comment) {
      content = (
        <div>
          <div className="msg-info">
              <div className="comment-user-info">
                <img src={comment.sender.avatar} />
                <div className="msg-text">
                  <div className="msg-name">{comment.sender.name}</div>
                  <div className="msg-time">2016-02-29</div>
                </div>
              </div>
              <div className="msg-content">
                <p>{comment.comment.content}</p>
              </div>
            </div>
            <div className="msg-info">
              <div className="comment-user-info">
                <img src={comment.sender.avatar} />
                <div className="msg-text">
                  <div className="msg-name">{comment.sender.name}</div>
                  <div className="msg-time">2016-02-29</div>
                </div>
              </div>
              <div className="msg-content">
                <p>{comment.comment.content}</p>
              </div>
          </div>
        </div>
      );
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