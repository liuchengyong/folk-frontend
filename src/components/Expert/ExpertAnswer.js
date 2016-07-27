/**
 * 导师详情 导师话题
 */
import React from 'react';
import {DecimalFormat} from '../../common/mathFormate';
import {decodeString} from '../../common/string';
import {formateTime} from '../../common/timeFormate';



let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class ExpertAnswer extends React.Component {
  DownApp() {
    this.props.actions.setDialogStatus(true);
  }
  render() {
    return (
      <div className="expert-answer-list">
        {this.props.answers.results.map((answer,index) =>{
            return index > 10 ? null : (<div className = "expert-answer" key={answer.answer.id}>
              <div className = "expert-answer-header">
                <img className="expert-answer-header-avatar" src={answer.questioner.avatar || ic_me_avatar_default} />
                <span className="expert-answer-header-name">{decodeString(answer.questioner.name || answer.questioner.loginName || '匿名') + '提问了问题'}</span>
                <span className="expert-answer-header-pirce">{`¥${DecimalFormat((answer.amount/100),2)}`}</span>
              </div>
              <div className = "expert-answer-question">{answer.question}</div>
              {answer.answer.type == 'RICH_TEXT' ? (
                  <div className="expert-answer-text" >
                    <span className="expert-answer-control-desc">1元去瞅瞅</span>
                  </div>):(
                  <div className="expert-answer-audio">
                    <span className="expert-answer-control-desc">1元去听听</span>
                    <span className='expert-answer-audio-timer'>{answer.answer.duration+'\'\''}</span>
                  </div>)}
              <span className="expert-answer-time">{formateTime(answer.answer.timeAnswered)}</span>
              <span className="expert-answer-unworth">{`${answer.unworthCount}人别闹`}</span>
              <span className="expert-answer-paytime">{`${answer.paymentTimes}人${answer.answer.type == 'RICH_TEXT' ? '瞅瞅':'听听'}`}</span>
            </div>);
          })
        }
      </div>);
  }
}

export default ExpertAnswer;