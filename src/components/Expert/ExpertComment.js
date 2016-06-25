/**
 * 导师详情 评论部分
 */
import React from 'react';
import Time from '../../common/timeFormate';
let hasStar = require('../../images/icon/started.png'),
    noStar = require('../../images/icon/star.png'),
    ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class ExpertComment extends React.Component {
  DownApp() {
    this.props.actions.setDialogStatus(true);
  }

  render() {

    //todo 讲数据扁平化
   let expert = this.props.expert;

   let commentCount = expert.comment.totalSize;
   let comment = commentCount && expert.comment.results[0];
   let commentStart = commentCount && comment.comment.starCount;

   let commentTopic = (comment != 0) && comment.topic.topic;
   let commentContent = null;

    let star = [];
    let stared = null;
    for (var i = 0; i < 5; i++) {
      if (i < comment.starCount) {
        star[i] = true;
      } else {
        star[i] = false;
      }
    }
    stared = star.map((bool, i) => {
      if(!bool) {
        return <img src={hasStar} key={i}/>
      } else {
        return <img src={noStar} key={i}/>
      }
    })


   if(comment) {
    commentContent = (
       <div className="expert-evaluate">
          <div className="expert-evaluate-title">
              <span className="expert-evaluate-title-text">评价</span>
          </div>
          <div className="evaluate_top">
              <img className="evaluate_top_head_img" src={comment.sender.avatar || ic_me_avatar_default} />
              <span className="evaluate_top_name">
                  {comment.sender.name}
                  <small>{Time.formateDate(comment.comment.timeRecorded)}</small>
              </span>
              <span className={'evaluate_top_start evaluate_top_start--' + commentStart}>
                  {stared}
              </span>
          </div>
          <div className="evaluate_join_topic">
              参与的话题：{commentTopic.title}
          </div>
          <div className="evaluate_content">
              {decodeURIComponent(comment.comment.content)}
          </div>
          {commentCount > 1 &&
            <span onClick={this.DownApp.bind(this)} className="evaluate_more">查看更多评论</span>
          }
      </div> );
   } else {
    commentContent = null;
   }
    return (
      <div >
        {commentContent}
      </div>
    );
  }
}

export default ExpertComment;