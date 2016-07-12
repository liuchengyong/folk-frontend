import React from 'react';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');
require('styles/answer/_answerList.scss');

import AnswerPayControlComponent from './AnswerPayControl';

import {formateTime} from '../../common/timeFormate';
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
	    this.props.actions.fetchAnswerData(id);
  	}
  	loadNextPage(){
  		if(this.props.data.answerList.pageSize >= this.props.data.answerList.totalSize){
			this.setState({isLoadMore:false});
  			return;
  		}
  		this.props.actions.fetchAnswerListData(this.props.user.openid,0,this.props.data.answerList.pageSize + 20);
  	}
	render(){
		let list = this.props.data.answerList.results;
		return (
			<div className="answer-list">
				{list.map(answer =>{
					let answerDom = null;
					return (<div className="answer-list-item" key={answer.answer.id}>
						<div className="item-text" onClick={this.changePageState.bind(this,'detail',answer.answer.questionId)}>{decodeString(answer.question)}</div>
			            <div className="item-header" onClick={this.changePageState.bind(this,'detail',answer.answer.questionId)}>
			            	<img className="item-person-avatar" src={answer.answererAvater || ic_me_avatar_default} />
		            		<span className="item-person-name">{answer.answererName}</span>
		            		<span className="item-person-title">{answer.answererTitle}</span>
		            		<span className="item-paymentTimes">{`${answer.paymentTimes}人${answer.answer.type == 'AUDIO' ? '听听' : '瞅瞅'}`}</span>
		            		<span className="item-unworth">{`${answer.unworthCount}人别闹`}</span>
		            		<span className="item-header-price">{`¥${DecimalFormat(answer.amount/100,2)}`}</span>
			            </div>
			           	<AnswerPayControlComponent answer={answer} isShow={false} actions={this.props.actions} user={this.props.user}/>
			        </div>);
				})}
				<div className="answer-list-load-more" onClick={this.loadNextPage.bind(this)}>
					{this.state.isLoadMore?'点击加载跟多':'已经没有了哦'}
				</div>
    		</div>);
	} 
}
export default AnswerListComponent;