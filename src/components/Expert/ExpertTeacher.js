/**
 * 导师详情 导师话题
 */
import React from 'react';
import {DecimalFormat} from '../../common/mathFormate';


let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class ExpertTeacher extends React.Component {
  DownApp() {
    this.props.actions.setDialogStatus(true);
  }
  render() {

    let teacherList = this.props.teachers.results.map((teacher,index) =>{
      if(index >= 3) return;
      return (<div className="expert-teacher-item" key={teacher.topic.id}>
          <img className="expert-teacher-item-avatar" src={teacher.expert.user.avatar || ic_me_avatar_default}/>
          <div className="expert-teacher-item-person">
            <span className="expert-teacher-item-topic">{teacher.topic.title}</span>
            <span className="expert-teacher-item-tag"></span>
            <span className="expert-teacher-item-name">{teacher.expert.user.name || teacher.expert.user.loginName || '匿名'}</span>
          </div>
        </div>);
    });

    return (
	    <div className="expert-teacher">
        <div className="expert-teacher-title">
            <span className="expert-teacher-title-text">推荐点师</span>
        </div>
        {teacherList}
    </div>
    );
  }
}

export default ExpertTeacher;