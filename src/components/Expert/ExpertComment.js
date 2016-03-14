/**
 * 导师详情 评论部分
 */
import React from 'react';
import Dialog from '../Common/Dialog';
import Time from '../../common/timeFormate';

class ExpertComment extends React.Component {

  DownApp() {
    this.props.actions.setDialogStatus(true);
  }

  render() {
   
    let dialog = null;
    if(this.props.dialog.isOpening){
      console.log(this.props.actions);
      console.log('===========');
      dialog = <Dialog actions={this.props.actions}/>
    } else {
      dialog = null;
    }

    //todo 讲数据扁平化
   let expert = this.props.expert;
   let user = expert.user;
   let expertInfo = expert.expert;

   let commentCount = expert.comment.totalSize;
   let comment = commentCount && expert.comment.results[0];
   let commentStart = commentCount && comment.comment.starCount;

   let commentTopic = (comment != 0) && comment.topic.topic;
   let commentContent = null;


   if(comment) {
    commentContent = (
       <div className="evaluate ">
          <div className="evaluate_title">
              <span className="evaluate_title_text">评价</span>
          </div>
          <div className="evaluate_top">
              <img className="evaluate_top_head_img" src={comment.sender.avatar} />
              <span className="evaluate_top_name">
                  {comment.sender.name}
                  <small>{Time.formateDate(comment.topic.topic.onlineRule.timeCreated)}</small>
              </span>
              <span className={'evaluate_top_start evaluate_top_start--' + commentStart}>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i>
              </span>
          </div>
          <div className="evaluate_join_topic">
              参与的话题：{commentTopic.title}
          </div>
          <div className="evaluate_content">
              {commentTopic.description}
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
        {dialog}
        {commentContent}
      </div>
    );    
  }
}

export default ExpertComment;