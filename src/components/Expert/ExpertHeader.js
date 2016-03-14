/**
 * 导师详情 头部部分
 */
import React from 'react';
import Dialog from '../Common/Dialog';
import config from 'config';
class ExpertHeader extends React.Component {

  DownApp() {
    this.props.actions.setDialogStatus(true);
  }

  render() {
    
  let dialog = null;
  if(this.props.dialog.isOpening){
    dialog = <Dialog actions={this.props.actions}/>
  } else {
    dialog = null;
  }

  let expert = this.props.expert.expert;
  let user = expert.user;
  let expertInfo = expert.expert;
  let appointTime = this.props.expert.appointmentTimes;

  let eduInfo = user.educationList[0];
  let replyTime = expertInfo.replyTime;
  if(replyTime == 0) {
  replyTime = '6小时';
  } else if(replyTime > 24) {
  replyTime = parseInt(replyTime / 24) + '天';
  } else {
  replyTime = replyTime + '小时'
  }

    return (
      <div className="back_wall">
      {dialog}
          <div className="back_wall_top">
              <img className="back_wall_top_img" src={expertInfo.descriptionPicture} />
          </div>
          <div className="back_wall_icon">
              <div className="back_wall_head">
                  <img className="back_wall_head_img" src={user.avatar} />
              </div>
              <span className="back_wall_focus">
                  <i className="fa fa-heart-o"></i> {expert.favoriteCount}
              </span>
          </div>
          <span className="back_wall_name">{user.name}</span>
          <div className="back_wall_client">
              <span className="back_wall_client_browse">{expert.views}浏览</span>
              <span className="back_wall_client_request">{appointTime}人求指点</span>
              <span className="back_wall_client_response">约{replyTime}回复</span>
          </div>
          <div className="back_wall_tag">
              <span className="back_wall_tag_school">{eduInfo.college.name}</span>
              <span className="back_wall_tag_education">{config.eduLevelMap[eduInfo.educationInfo.educationLevel]}</span>
              <span className="back_wall_tag_job">{eduInfo.educationInfo.major}</span>
          </div>
          <span onClick={this.DownApp.bind(this)} className="back_wall_btn back_wall_btn">关注</span>
      </div>
    );
  }
}

export default ExpertHeader;