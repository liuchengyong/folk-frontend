/**
 * 爆料详情
 * Created by HuangGuorui on 2/26/16.
 */
import React from 'react';
import Dialog from '../Common/Dialog';
import Time from '../../common/timeFormate';
import Code from '../../common/code';

class BrokeDesc extends React.Component {

  DownApp() {
    this.props.actions.setDialogStatus(true);
  }

  render() {

    let broke = this.props.broke.results;
    let id = this.props.id;
    let desc = broke[0];
    let comment = broke;

    let dialog = null;
    if (this.props.dialog.isOpening) {
      dialog = <Dialog actions={this.props.actions}/>
    } else {
      dialog = null;
    }

    let commentList = null;
    if (comment) {
      commentList = comment.map((ct, index) => {
        if (index == 0) {
          return false;
        }
        return (
          <li key={ct.comment.id} className="broke-comment-list">
            <div className="broke-commeit-avatar">
              <img src={JSON.parse(ct.comment.priv).user.avatar}/>
            </div>
            <div className="broke-comment-info">
              <div className="broke-comment-userinfo">
				      				<span className="comment-username">
				      				{ct.comment.sender == desc.comment.sender ? '楼主' : JSON.parse(ct.comment.priv).user.loginName}
				      				</span>
				      				<span className="comment-up">
				      				<i onClick={this.DownApp.bind(this)}></i>{ct.countOfLike}
				      				</span>
              </div>
              <div className="broke-content">
                <span
                  className="reply-comment">{ct.parent.id !== id ? '回复' + JSON.parse(ct.parent.priv).user.loginName + '  ' : ''}</span>
                {decodeURIComponent(ct.comment.content)}
              </div>
              <div className="broke-comment-time">
                {Time.formateBrokeTime(ct.comment.timeRecorded)}
              </div>
            </div>
          </li>
        );
      });
    }
    return (
      <div className="broke-wrapper">
        {dialog}
        <div className="broke-desc">
          <div className="borke-header">
            <div className="author-avatar">
              <img src={JSON.parse(desc.comment.priv).user.avatar}/>
            </div>
            <div className="author-name">
              {JSON.parse(desc.comment.priv).user.loginName}
            </div>
            <div className="desc-time">
              {Time.formateBrokeTime(desc.comment.timeRecorded)}
            </div>
          </div>
          <div className="broke-content">
            <div className="broke-text">
              {decodeURIComponent(desc.comment.content)}
            </div>
            {desc.comment.images.length > 0 &&
            <div className="broke-img">
              <img src={desc.comment.images[0].uri}/>
            </div>
            }
          </div>
        </div>
        {(() => {
          if(comment.length > 1) {
            return (
            <div className="broke-comment">
              <div className="comment-title">
                <span>全部评论</span>
              </div>
              <ul className="broke-comment-gruop">
                {commentList}
              </ul>
            </div>)
          }

        })()}

        <div className="more-broke">
          <button onClick={this.DownApp.bind(this)}> 打开指点查看更多评论</button>
        </div>
      </div>
    );
  }
}

export default BrokeDesc;