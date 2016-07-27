/**
 * 导师详情 导师话题
 */
import React from 'react';
import {duration2time,formateDate} from '../../common/timeFormate';
import {paresHtmlToText,decodeString} from '../../common/string';
let hasStar = require('../../images/icon/started.png'),
    noStar = require('../../images/icon/star.png'),
    ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class ExpertTopic extends React.Component {
  render() {
   let {topics, comments, experts} = this.props;
    return (
	    <div className="expert-topic">
        <div className="expert-topic-list">
          {
            topics.map(topic=>{
              return (
                <div className="expert-topic-item" key={topic.id}>
                  <span className="expert-topic-item-header-title">{topic.title}</span>
                  <span className="expert-topic-item-header-price">{`¥${topic.amount/100}/次`}</span>
                  <span className="expert-topic-item-time">{duration2time(topic.duration)}</span>
                  <div className="expert-topic-item-content">{paresHtmlToText(topic.description)}</div>
                </div>);
            })
          }
        </div>
        {
          comments.totalSize > 0 ? (
              <div className="expert-wrapper">
                <div className="expert-wrapper-header">点友评价</div>
                {comments.results.map((comment,index)=>{
                  let star = [true,true,true,true,true];
                  return index > 0 ? null : (
                    <div className="expert-comment" key={comment.comment.id}>
                      <div className="export-comment-header">
                        <img className="export-comment-header-avatar" src={comment.sender.avatar || ic_me_avatar_default} />
                        <span className="export-comment-header-name">{decodeString(comment.sender.name || comment.sender.loginName || '匿名')}</span>
                        <span className="export-comment-header-timeRecorded">{formateDate(comment.comment.timeRecorded)}</span>
                        <span className="export-comment-header-star">
                            {star.map((bool,index)=>{
                              return <img key={index} src={index < comment.comment.starCount ? hasStar:noStar} />
                            })}
                        </span>
                      </div>
                      <div className="export-comment-content">{decodeString(comment.comment.content)}</div>
                      <div className="export-comment-join">{'参与话题：'+ comment.topic.topic.title}</div>
                    </div>);
                })}
                {comments.totalSize > 1 ? (
                  <div className="export-comment-more">查看更多评价</div>): null}
              </div>) : null
        }
        {
          experts.totalSize > 0 ? (
           <div className="expert-wrapper">
             <div className="expert-wrapper-header">推荐点师</div>
             {
                experts.results.map(recommend=>{
                  return (
                    <div className="expert-recommend" key={recommend.topic.id}>
                      <img className="expert-recommend-avatar" src={recommend.expert.user.avatar || ic_me_avatar_default}/>
                      <span className="expert-recommend-title">{recommend.topic.title}</span>
                      <span className="expert-recommend-name">{decodeString(recommend.expert.user.name || recommend.expert.user.loginName || '匿名')}</span>
                      <span className="expert-recommend-ptitle">{recommend.expert.expert.title}</span>
                    </div>);
                })
             }
            </div>) : null
        }


    </div>
    );
  }
}

export default ExpertTopic;