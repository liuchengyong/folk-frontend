
import React from 'react';
import Time from '../../common/timeFormate';
let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');
class ContentComment extends React.Component {
	DownApp() {
		    this.props.actions.setDialogStatus(true);
	}
	render(){
		// console.log(this);
		let comments = this.props.dynamic.comments.results;
		let options = comments.map((comment,i) => {
			let user = JSON.parse(comment.comment.priv).user;
			return (
				<div className="msg-option" key={i} onClick={this.DownApp.bind(this)}>
					<div className="msg-option-header">
						<img className="sender-avatar" src={user.avatar || ic_me_avatar_default} />
						<div className="sender-base">
							<span className="sender-name">{decodeURIComponent(comment.sender.name || user.loginName || '匿名')}</span>
							<span className="sender-time">{Time.formateBrokeTime_(comment.comment.timeRecorded)}</span>
						</div>
					</div>
					<div className="msg-text">{decodeURIComponent(comment.comment.content)}</div>
				</div>);
		});
		return (
			<div className="msg">
				<div className="msg-header">
					最新评论
				</div>
				{options}
			</div>
			);
	}
}
export default ContentComment;