/**
 * 导师详情 评论部分
 */
import React from 'react';

class ExpertComment extends React.Component {

  render() {
   
   let expert = this.props.expert;
   let user = expert.user;
   let expertInfo = expert.expert;

   let commentCount = expert.comment.totalSize;
   let comment = commentCount && expert.comment.results[0];
   let commentTopic = comment.topic.topic;
    return (
      <div className="evaluate ">
          <div className="evaluate_title">
              <span className="evaluate_title_text">评价</span>
          </div>
          <div className="evaluate_top">
              <img className="evaluate_top_head_img" src={comment.sender.avatar} />
              <span className="evaluate_top_name">
                  {comment.sender.name}
                  <small>2016-01-20</small>
              </span>
              <span className="evaluate_top_start evaluate_top_start--5">
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
            <span className="evaluate_more">查看更多评论</span>
          }
      </div>
    );
  }
}

export default ExpertComment;