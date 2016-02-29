/**
 * 最新评价
 * @date 2/26/2016
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';

class LatestComment extends React.Component {

	DownApp() {
		// console.log(this.props);
		// get dialog status
		// re render status
		// 
		this.props.actions.setDialogStatus(true);
	}

	CloseDialog() {
		this.props.actions.setDialogStatus(true);
	}

  render() {

    let comment = this.props.comment.results[0];
    let dialog = null;

    console.log('----------------------------');
    console.log(this.props.dialog.isOpening);
		console.log(this.props);
		console.log('------------------------------');
    if(this.props.dialog.isOpening) {
    	dialog = <Dialog actions={this.props.actions}/>
    } else {
    	dialog = null;
    };

    return (
 	 		<div>
	      <div className="comment-wrap">
	       	<div className="title">最新评论</div>
		      <div className="comment-info">
		      	<div className="comment-user-info">
		      		<img src={comment.sender.avatar} />
	      			<div className="comment-text">
                <div className="comment-name">{comment.sender.name}</div>
                <div className="comment-time">2016-02-26</div>
          		</div>
		      	</div>
		      	<div className="comment-content">
		      		<p>{comment.comment.content}</p>
		      	</div>
		     	</div>
	     		<div className="more-comment">
	      		<span ref="moreComment" onClick={this.DownApp.bind(this)} >更多评论</span>
	      	</div>
	      	{dialog}
	    	</div>
	    </div>

    );
  }
}

export default LatestComment;