import React from 'react';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class QuestionComponent extends React.Component {
	DownApp() {
	    this.props.actions.setDialogStatus(true);
	}
	render(){
		var question = this.props.question;
		// console.log(question);
		return (
			<div className="question">
		        <div className="question-header">
		            <img  className="question-person-icon" src={question.questionerAvater} />
		            <span className="question-title">{question.questionerName}</span>
		            <span className="question-price">{'¥'+ (question.amount/100)}</span>
		        </div>
		        <div className="question-text">{question.question.title}</div>
    		</div>);
	}
}
export default QuestionComponent;