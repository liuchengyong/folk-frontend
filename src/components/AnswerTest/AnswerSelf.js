import React from 'react';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png'),
	ic_me_eye = require('../../images/answer-self-eyes.png'),
	ic_me_phone = require('../../images/answer-self-phone.png'),
	ic_arrow_right = require('../../images/arrow-right.png');
require('styles/answer/_answerSelf.scss');

import {formateTime} from '../../common/timeFormate';
import {decodeString} from '../../common/string';
import {DecimalFormat} from '../../common/mathFormate';

class AnswerSelfComponent extends React.Component {
	constructor(props) {
	    super(props);
	}
	goSelf(){
		this.props.actions.fetchAnswerPageState({isFetching:true});
		this.props.actions.fetchAnswerListOfMeData(this.props.user.openid,0,5);
	}
	render(){
		let user = this.props.user;
		return (<div className="answer-self">
					<div className="answer-self-header">
						<img className="answer-self-avatar" src={user.headimgurl || ic_me_avatar_default}/>
						<span className="answer-self-name">{user.nickname}</span>
						<span className="answer-self-line"></span>
					</div>
					<div className="answer-self-list">
						<div className="answer-self-paided" onClick={this.goSelf.bind(this)}>
							<img className="answer-self-paided-icon" src={ic_me_eye}/>
							<span className="answer-self-paided-title">我瞅过的</span>
							<img className="answer-self-paided-arrow" src={ic_arrow_right}/>
						</div>
						<div className="answer-self-phone">
							<img className="answer-self-phone-icon" src={ic_me_phone}/>
							<span className="answer-self-phone-title">客服电话</span>
							<a className="answer-self-phone-number">010-59421689</a>
						</div>
					</div>
	    		</div>);
	} 
}
export default AnswerSelfComponent;