/**
 * 导师详情 导师话题
 */
import React from 'react';
import {DecimalFormat} from '../../common/mathFormate';


let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class ExpertAnswer extends React.Component {
  DownApp() {
    this.props.actions.setDialogStatus(true);
  }
  render() {
    let answerList = this.props.answers.results.map((answer,index) =>{
      if(index >= 5) return null;
      return (<div className = "expert-answer-item" key={answer.answer.id}>
          <div className = "expert-answer-item-question-text">{answer.question}</div>
          <div className = "expert-answer-item-answer">
            <img className="expert-answer-item-answer-avater" src={answer.answererAvater || ic_me_avatar_default} />
            <div className="expert-answer-item-answer-title">
                <span className="expert-answer-item-answer-name">{answer.questioner.name || answer.questioner.loginName || '匿名'}</span>
                <span className="expert-answer-item-answer-pirce">{`¥${DecimalFormat((answer.amount/100),2)}`}</span>
            </div>
             <div className="expert-answer-item-answer-tag">
              <span className="expert-answer-item-answer-tag-paytime">{`${answer.paymentTimes}人瞅瞅`}</span>
              <span className="expert-answer-item-answer-tag-unworth">{`${answer.unworthCount}人别闹`}</span>
            </div>
          </div>
          <span className = "expert-answer-item-gopay" onClick={this.DownApp.bind(this)}>
              1元去瞅瞅
          </span>
        </div>);
    });

    return (
	    <div className="expert-answer">
        <div className="expert-answer-title">
            <span className="expert-answer-title-text">益达</span>
        </div>
        {answerList}
    </div>
    );
  }
}

export default ExpertAnswer;