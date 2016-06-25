/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
import config from 'config';
import Helmet from 'react-helmet';
import marked from 'marked';

import {formateTime} from '../../common/timeFormate';


import Topics from './Topics';
import ConsultationComments from './ConsultationComments';
import WechatWrapper from '../WechatWrapper';
import DeviceAdapter from '../../common/deviceAdapter';
import TopBanner from '../Common/TopBanner';
import Loading from '../Common/Loading';

require('../../styles/_consultation.scss');
let logo_icon = require('../../images/icon/logo_icon.png');


class Consultation extends React.Component {
  render() {
    if (this.props.consultation.isFetching) {
      return <Loading />;
    }
    let consultation = this.props.consultation,
        dialog = this.props.dialog,
        actions = this.props.actions,
        article = consultation.article;


    return (
      <div className='detailbox'>
        <TopBanner actions={actions} dialog={dialog} />
        <Helmet title={consultation.article.title} />
        <article>
          <h2>
            <span className='article_title'>{article.title}</span>
            <small>
              <span>来自：<span className='article_channel'>{article.channel}</span></span>
              <span className='article_timeRecorded'>{formateTime(article.timeRecorded)}</span>
            </small>
          </h2>
          <div dangerouslySetInnerHTML={{__html: marked(article.content || '')}}></div>
        </article>
        {consultation.comments.results.length > 0 ? (<ConsultationComments comments={consultation.comments} />) : null}

        {(()=>{
          if (consultation.topics.length > 0) {
              if(consultation.topics[0].expert.expert.title) {
                if(consultation.topics[0].expert.expert.role == 'PARENTS' || consultation.topics[0].expert.expert.role == 'TEACHER') {
                  consultation.topics[0].shortDesc = consultation.topics[0].expert.expert.title
                }
              }
              if(consultation.topics[0].expert.expert.role == 'STUDENT') {
                if(consultation.topics[0].expert.user.educationList.length > 0) {
                  consultation.topics[0].shortDesc = consultation.topics[0].expert.user.educationList[0].college.name;
                }
              } else {
                consultation.topics[0].shortDesc = '';
              }
            return <Topics topics={consultation.topics}/>
          }
        })()}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && !nextProps.consultation.isFetching) {
      nextProps.configWechatSharing({
        title: '【指点】' + nextProps.consultation.article.title,
        desc: nextProps.consultation.article.summary,
        link: `${config.baseUrl}/consultation/${nextProps.params.id}`,
        imgUrl: nextProps.consultation.article.sharedCover|| nextProps.consultation.article.cover || logo_icon
      });
    }
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchConsultation(this.props.params.id);
  }
}

export default WechatWrapper(Consultation);