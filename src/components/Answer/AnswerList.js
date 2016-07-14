import React from 'react';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png'),
	ic_me_answer_list_null = require('../../images/me-paid-list-null.png');
require('styles/answer/_answerList.scss');

import AnswerPayControlComponent from './AnswerPayControl';

import {decodeString} from '../../common/string';
import {DecimalFormat} from '../../common/mathFormate';

class AnswerListComponent extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	isLoadMore:true
	    };
	}
	changePageState(pageType,id){
	    if(pageType == this.props.data.pageType) return;
	    this.props.actions.fetchAnswerPageState({isFetching:true});
	    if(pageType == 'detail'){
	    	this.props.actions.fetchAnswerData(id);
	    }else if(pageType == 'list'){
	    	this.props.actions.fetchAnswerListData(this.props.user.openid,0,10);
	    }
	    
  	}
  	loadNextPage(){
  		if(this.props.data.answerList.pageSize >= this.props.data.answerList.totalSize){
			this.setState({isLoadMore:false});
  			return;
  		}
  		this.props.actions.fetchAnswerCommentFrom(this.props.data,{isOpenLoad:true,loadText:'[益答]正在努力搬运中'});
  		this.props.data.pageType == 'list' ? this.props.actions.fetchAnswerListData(this.props.user.openid,0,this.props.data.answerList.pageSize + 10)
  			:this.props.actions.fetchAnswerListOfMeData(this.props.user.openid,0,this.props.data.answerList.pageSize + 5);
  	}
	render(){
		let list = this.props.data.answerList.results;
		return (
			<div className="answer-list">
				{list.map(answer =>{
					return (<div className="answer-list-item" key={answer.answer.id}>
						<div className="item-text" onClick={this.changePageState.bind(this,'detail',answer.answer.questionId)}>{decodeString(answer.question.title || answer.question)}</div>
			            <div className="item-header" onClick={this.changePageState.bind(this,'detail',answer.answer.questionId)}>
			            	<img className="item-person-avatar" src={answer.answererAvater || ic_me_avatar_default} />
		            		<span className="item-person-name">{answer.answererName}</span>
		            		<span className="item-person-title">{answer.answererTitle}</span>
		            		<span className="item-paymentTimes">{`${answer.paymentTimes}人${answer.answer.type == 'AUDIO' ? '听听' : '瞅瞅'}`}</span>
		            		<span className="item-unworth">{`${answer.unworthCount}人别闹`}</span>
		            		<span className="item-header-price">{`¥${DecimalFormat((answer.amount || answer.questionAmount)/100,2)}`}</span>
			            </div>
			           	<AnswerPayControlComponent pageType={'list'} answer={answer} isShow={false} actions={this.props.actions} user={this.props.user}/>
			        </div>);
				})}
				{this.props.data.answerList.totalSize == 0 ? null : (<div className="answer-list-load-more" onClick={this.loadNextPage.bind(this)}>
					{this.state.isLoadMore?'点击加载更多':'已经没有了哦'}
				</div>)}
				
				{this.props.data.answerList.totalSize == 0 &&  this.props.data.pageType == 'melist' ? (<div className="answer-list-null">
						<img className="answer-list-null-back" src={ic_me_answer_list_null}/>
						<span className="answer-list-null-desc">你暂时还没有益答内容哟</span>
						<span className="answer-list-null-btn" onClick={this.changePageState.bind(this,'list')}>去看看热门益答吧</span>
					</div>) : null}
				
    		</div>);
	}
}
export default AnswerListComponent;