/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
import config from 'config';
import {Link} from 'react-router';
import defaultIcon from '../../images/icon/logo_icon.png';
import icPingLun from '../../images/ic_pinglun.png'

const TopicDetail = (props) => (

  <Link to={`/topic/${props.topic.id}`}>
    <div className='talk-item'>
      <div className='talk-head'>
        <span className='person-headimg'>
            <img className='topics_avatar' src={props.expert.user.avatar || defaultIcon}/>
        </span>
        <div className='personbox'>
          <span className='topics_name'>{props.expert.user.loginName || props.expert.user.name || '匿名'}</span>
          <span>｜</span>
          <span className='topics_title'>{props.topic.title}</span>
        </div>
      </div>
      <div className='talk-body'>
        <span className='tag topics_role'>{config.roles[props.expert.expert.role]}</span>
        <span className='talk topics_description'>{props.topic.description}</span>
      </div>
      {(()=> {
        if (props.countOfComment > 0) {
          return (
            <div className='talk-foot'>
              <img className='answerimg' src={icPingLun}/>
              <span className='answenum'>
                <span className='topics_countOfComment'>{props.countOfComment}</span>
              </span>
            </div>
          );
        }
      })()}
    </div>
  </Link>
);

export default TopicDetail;