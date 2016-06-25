import React from 'react';
import {decodeString} from '../../common/string';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class ConsultationComments extends React.Component {
  render(){
    let commentsDom = this.props.comments.results.map(comment=>{
      return (<div className="comment" key={comment.comment.id}>
                <div className="comment-header">
                    <img className="comment-icon" src={comment.sender.avatar || ic_me_avatar_default}/>
                    <div className="comment-header-center">
                        <span className="comment-name">{decodeString(comment.sender.name || comment.sender.loginName || '匿名')}</span>
                        <span className="comment-date">{new Date(comment.comment.timeRecorded).Format('yyyy-MM-dd')}</span>
                    </div>
                    <span className="comment-like">{comment.countOfLike == 0 ? '': comment.countOfLike}</span>
                </div>
                <div className="comment-content">{decodeString(comment.comment.content)}</div>
            </div>);
    });

    return (<div className="commentbox">
        <div className="comment-title">
            <span>最新评论</span>
        </div>
        <div className="comments" >
          {commentsDom}
        </div>
      </div>);
  }
}
export default ConsultationComments;