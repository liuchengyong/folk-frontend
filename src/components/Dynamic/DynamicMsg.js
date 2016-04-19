/**
*
*
*
*/

import React from 'react';
import Time from '../../common/timeFormate';
class ContentComment extends React.Component {
	DownApp() {
		    this.props.actions.setDialogStatus(true);
	}
	render(){
		// console.log(this);
		let comments = this.props.dynamic.comments.results;
		let options = comments.map((comment,i) => {
			comment = comment.comment;
			let user = JSON.parse(comment.priv).user;
			return (
				<div className="msg-option" key={i} onClick={this.DownApp.bind(this)}>
					<div className="msg-option-header">
						<img className="sender-avatar" src={user.avatar} />
						<div className="sender-base">
							<span className="sender-name">{decodeURI(user.loginName)}</span>
							<span className="sender-time">{Time.formateBrokeTime_(comment.timeRecorded)}</span>
						</div>
					</div>
					<div className="msg-text">{decodeURI(comment.content)}</div>
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