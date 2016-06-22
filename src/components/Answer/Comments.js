import React from 'react';
import {formateBrokeTime_} from '../../common/timeFormate';
import {decodeString} from '../../common/string';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');
class CommentsComponent extends React.Component {
	
	DownApp() {
	    this.props.actions.setDialogStatus(true);
	}
	render(){
		let comments = this.props.comments;
		let commentsDom = comments.results.map((comment)=>{
			return (
				<div className="comment" key={comment.comment.id}>
		            <div className="comment-header">
		                <img className="comment-persion-icon" src={comment.sender.avatar || ic_me_avatar_default} />
		                <span className="comment-person-name">{decodeString(comment.sender.name || comment.sender.loginName || '匿名')}</span>
		                <span className="comment-publish-time">{formateBrokeTime_(comment.comment.timeRecorded)}</span>
		            </div>
		            <div className="comment-text">{decodeString(comment.comment.content)}</div>
		        </div>);
		});

		return (
			 <div className="comments">
		        <div className="comments-header">评论</div>
		        {commentsDom}
		        <div className="comments-footer" onClick={this.DownApp.bind(this)}>
		            点击加载更多
		        </div>
		    </div>);
	}
}
export default CommentsComponent;