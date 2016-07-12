import React from 'react';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');
import {formateTime} from '../../common/timeFormate';
import {decodeString} from '../../common/string';
import {DecimalFormat} from '../../common/mathFormate';

class QuestionComponent extends React.Component {
	render(){
		let question = this.props.question,
			type = this.props.type;
		return (
			<div className="question">
		        <div className="question-header">
		            <img  className="question-person-icon" src={question.questionerAvater || ic_me_avatar_default} />
		            <span className="question-title">{`${question.questionerName}的提问${formateTime(question.timeAnswered)}被回答`}</span>
		            <span className="question-price">{'¥'+ DecimalFormat((question.amount/100),2)}</span>
		        </div>
		        <div className="question-text">{decodeString(question.question.title)}</div>
    		</div>);
	} 
}
export default QuestionComponent;