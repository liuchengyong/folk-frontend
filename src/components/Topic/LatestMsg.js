/**
 * 最新留言组件
 * @author  HuangGuorui
 * @Date    2/29/2016
 */

import React from 'react';
import stringFramet from '../../common/string';
let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class LatestMsg extends React.Component {
  render() {
    let message = this.props.message.results;
    let content = null;
    content = (
          <div className="no-message">
          </div>
        );
    if(message.length > 0) {
      content = message.map((msg,i) => {
      return i > 2? null : (
          <div key={msg.comment.id} className="msg-info">
              <div className="comment-user-info">
                <img src={ msg.sender.avatar || ic_me_avatar_default} />
                <div className="msg-text">
                  <div className="msg-name">{stringFramet.decodeString(msg.sender.name || msg.sender.loginName || '匿名')}</div>
                  <div className="msg-time">{new Date(msg.comment.timeRecorded).Format('yyyy-MM-dd')}</div>
                </div>
              </div>
              <div className="msg-content">
                <p>{stringFramet.decodeString(msg.comment.content)}</p>
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