/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
import WechatWrapper from './WechatWrapper';
import icPingLun from '../images/ic_pinglun.png'
import defaultIcon from '../images/icon/logo_icon.png';
require('styles/_consultation.scss');

class Consultation extends React.Component {
  render() {
    return (
      <div className='detailbox'>
        <article id='article'>
          <h2>
            <span className='article_title'>两会，那些教育话题会成热词?</span>
            <small>
              <span>来自：<span className='article_channel'>网易新闻</span></span>
              <span className='article_timeRecorded'>12小时前</span>
            </small>
          </h2>

          <div id='article_content'></div>
        </article>

        <div className='talkbox' id='topicsbox'>
          <div className='talk-title'>
            <span>猜你喜欢</span>
          </div>

          <div className='talk-item' id='topics'>
            <div className='talk-head'>
                <span className='person-headimg'>
                    <img className='topics_avatar' src={defaultIcon} />
                </span>

              <div className='personbox'>
                <span className='topics_name'>王正</span>
                <span>｜</span>
                <span className='topics_title'>哈大学校长学校长助助理大理</span>
              </div>

            </div>
            <div className='talk-body'>
              <span className='tag topics_role'>名师</span>
              <span className='talk topics_description'>北京大学大法的方式圣诞节大法的方式圣诞节大法的方式圣诞节？</span>
            </div>
            <div className='talk-foot'>
              <img className='answerimg' src={icPingLun} />
                <span className='answenum'><span className='topics_countOfComment'>90</span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.actions.fetchConsultation(this.props.params.id);
  }
}

export default WechatWrapper(Consultation);