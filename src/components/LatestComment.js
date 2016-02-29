/**
 * 最新评价
 * @date 2/26/2016
 */

import React from 'react';

class LatestComment extends React.Component {
  render() {

    let comment = this.props.comment.results[0];

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
	      		<span>更多评论</span>
	      	</div>
	    	</div>
	    </div>

    );
  }
}

export default LatestComment;