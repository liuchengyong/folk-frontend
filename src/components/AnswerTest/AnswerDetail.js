import React from 'react';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png'),
	ic_comments_null_back = require('../../images/comment-null.png'),
	ic_comments_paid_null_back = require('../../images/comment-paid-null.png');
require('styles/answer/_answerDetail.scss');

import ReactInterval from 'react-interval';
import AnswerPayControlComponent from './AnswerPayControl';

import {formateTime} from '../../common/timeFormate';
import {decodeString} from '../../common/string';
import {DecimalFormat} from '../../common/mathFormate';

class AnswerDetailComponent extends React.Component {
	DownApp() {
    	this.props.actions.setDialogStatus(true);
  	}
	constructor(props) {
	    super(props);
	    this.state = {
	    	isPlay:false,
	    	duration:0,
	    };
	}
	openCommentFrom(){
    	this.props.actions.fetchAnswerCommentFrom(this.props.data,{isOpenFrom:true});
  	}
  	audioOpera(type){
  		this.state.duration = this.props.data.answerDetail.answer.duration;
  		if(type == 'click'){
  			console.log('click');
  			if(this.state.isPlay){
	  			this.refs.audioControl.load();
	  		}else{
	  			this.refs.audioControl.play();
	  		}
	  		this.setState({isPlay:!this.state.isPlay});
  		}else if('end'){
  			this.setState({isPlay:false});
  		}else if(type == 'start'){
  			console.log('start');
			this.setState({isPlay:true});
  		}
  	}
	render(){
		let data = this.props.data,
		 	question = data.answer,
		 	answer = data.answer,
		 	comments = data.comments,
		 	actions = this.props.actions,
		 	answerDetail = data.answerDetail;

		return (
			<div className="answer-detail">
				<div className="answer-detail-question">
			        <div className="answer-detail-question-header">
			            <img  className="answer-detail-question-person-icon" src={question.questionerAvater || ic_me_avatar_default} />
			            <span className="answer-detail-question-title">{`${question.questionerName}的提问${formateTime(question.timeAnswered)}被回答`}</span>
			            <span className="answer-detail-question-price">{'¥'+ DecimalFormat((question.amount/100),2)}</span>
			        </div>
			        <div className="answer-detail-question-text">{decodeString(question.question.title)}</div>
    			</div>
    			<div className="answer-detail-answer">
		          <div className="answer-detail-answer-header">
		              <img className="answer-detail-answer-person-icon" src={answer.answererAvater} />
		              <div className="answer-detail-answer-person">
		                <span className="answer-detail-answer-person-name">{answer.answererName}</span>
		                <div className="answer-detail-answer-person-right">
		                	<span className="answer-detail-answer-person-paymentTimes">{answer.paymentTimes == 0 ? ' ' : (answer.paymentTimes + '人' + (answer.answerType == 'RICH_TEXT' ? '瞅瞅':'听听'))}</span>
		                	<span className="answer-detail-answer-person-unworth">{answer.unworthCount == 0 ? '' : answer.unworthCount + '人别闹'}</span>
		                </div>
		              </div>
		              <span className="answer-detail-answer-person-major">{answer.answererTitle}</span>
		          </div>
		          <AnswerPayControlComponent answer={answerDetail} actions={this.props.actions} isShow={true} user={this.props.user}/>
		        </div>
		       	<div className="answer-detail-comments">
			        <div className="answer-detail-comments-header">
			        	<span className="answer-detail-comments-header-title">评论</span>
			        	<div className="answer-detail-comment-btn" onClick={this.openCommentFrom.bind(this)}>评论</div>
			        </div>
			        {
			        	comments.totalSize == 0 && answerDetail.answer.description == null ? (<div className="answer-detail-comments-null">
				        	<img className="answer-detail-comments-null-back" src={ic_comments_null_back}/>
				        	<span className="answer-detail-comments-null-msg">暂无评论，瞅瞅后才能评论哟！！！</span>
				        </div>) : null
			        }
			        {
			        	comments.totalSize == 0 && answerDetail.answer.description != null ? (<div className="answer-detail-comments-paid-null">
				        	<img className="answer-detail-comments-paid-null-back" src={ic_comments_paid_null_back}/>
				        	<span className="answer-detail-comments-paid-null-msg">暂无评论，赶快评论一下吧！！！</span>
				        </div>) : null
			        }
			        {
			        	comments.totalSize > 0 ? comments.results.map(comment =>{
							return (
								<div className="answer-detail-comment" key={comment.comment.id}>
						            <div className="answer-detail-comment-header">
						                <img className="answer-detail-comment-persion-icon" src={comment.sender.avatar || ic_me_avatar_default} />
						                <span className="answer-detail-comment-person-name">{decodeString(comment.sender.name || comment.sender.loginName || '匿名')}</span>
						                <span className="answer-detail-comment-publish-time">{formateTime(comment.comment.timeRecorded)}</span>
						            </div>
						            <div className="answer-detail-comment-text">{decodeString(comment.comment.content)}</div>
						        </div>);
						}):null
			        }
			        {
			        	comments.totalSize > 0 ? (<div className="answer-detail-comments-footer"  onClick={this.DownApp.bind(this)}>
					            发现更多精彩回答
					        </div>)	: null
			        }
			    </div>
    		</div>);
	} 
}
export default AnswerDetailComponent;