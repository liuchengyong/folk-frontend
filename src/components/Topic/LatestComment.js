/**
 * 最新评价
 * @date 2/26/2016
 * @author    HuangGuorui
 */

import React from 'react';
import Dialog from '../Common/Dialog';
let hasStar = require('../../images/icon/started.png');
let noStar = require('../../images/icon/star.png');

class LatestComment extends React.Component {

  DownApp() {
    this.props.actions.setDialogStatus(true);
  }

  render() {

    let comment = this.props.comment.results[0];
    let dialog = null;

    if (this.props.dialog.isOpening) {
      dialog = <Dialog actions={this.props.actions}/>
    } else {
      dialog = null;
    }
    let star = [];
    let stared = null;
    for (var i = 0; i < 5; i++) {
      if (i < comment.comment.starCount) {
        star[i] = true;
      } else {
        star[i] = false;
      }
    }
  stared = star.map((bool, i) => {
    if(bool) {
      return <img src={hasStar} key={i}/>
    } else {
      return <img src={noStar} />
    }
  })

    return (
      <div>
        <div className="comment-wrap">
          <div className="title">最新评论</div>
          <div className="comment-info">
            <div className="comment-user-info">
              <img src={comment.sender.avatar}/>
              <div className="comment-text">
                <div className="comment-name">{comment.sender.name}</div>
                <div className="comment-time">2016-02-26</div>
              </div>
              <div className="comment-start">
                {stared}
              </div>
            </div>
            <div className="clear"></div>
            <div className="comment-content">
              <p>{comment.comment.content}</p>
            </div>
          </div>
          <div className="more-comment">
            <span ref="moreComment" onClick={this.DownApp.bind(this)}>更多评论</span>
          </div>
          {dialog}
        </div>
      </div>

    );
  }
}

export default LatestComment;