import React from 'react';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');
import {formateBrokeTime_} from '../../common/timeFormate';
import {decodeString} from '../../common/string';
class QuestionComponent extends React.Component {
	DownApp() {
	    this.props.actions.setDialogStatus(true);
	}
	render(){
		var question = this.props.question;
		return (
			<div className="question">
		        <div className="question-header">
		            <img  className="question-person-icon" src={question.questionerAvater || ic_me_avatar_default} />
		            <span className="question-title">{`${question.questionerName}的提问${formateBrokeTime_(question.timeAnswered)}被回答`}</span>
		            <span className="question-price">{'¥'+ (question.amount/100)}</span>
		        </div>
		        <div className="question-text">{decodeString(question.question.title)}</div>
    		</div>);
	}
}
export default QuestionComponent;