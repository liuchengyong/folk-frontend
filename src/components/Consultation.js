/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
import config from 'config';
import Article from './Consultation/Article';
import Topics from './Consultation/Topics';
import WechatWrapper from './WechatWrapper';
import DeviceAdapter from '../common/deviceAdapter';
import TopBanner from './Common/TopBanner';
import Helmet from 'react-helmet';
import Loading from './Common/Loading';
require('styles/_consultation.scss');

class Consultation extends React.Component {
  render() {
    if (this.props.consultation.isFetching) {
      return <Loading />;
    }
    let consultation = this.props.consultation;
    let param = consultation.param || {};

    let dialog = this.props.dialog;
    let actions = this.props.actions;

    let title = consultation.param.article.title;

    return (
      <div className='detailbox'>
        <TopBanner actions={actions} dialog={dialog}/>
        <Helmet title={title} />
        <Article article={param.article || {}}/>
        {(()=>{
          if (param.topics.length > 0) {
              if(param.topics[0].expert.expert.title) {
                if(param.topics[0].expert.expert.role == 'PARENTS' || param.topics[0].expert.expert.role == 'TEACHER') {
                  param.topics[0].shortDesc = param.topics[0].expert.expert.title
                }
              }
              if(param.topics[0].expert.expert.role == 'STUDENT') {
                if(param.topics[0].expert.user.educationList.length > 0) {
                  param.topics[0].shortDesc = param.topics[0].expert.user.educationList[0].college.name;
                }
              } else {
                param.topics[0].shortDesc = '';
              }
            return <Topics topics={param.topics || {}}/>
          }
        })()}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && nextProps.consultation.param.article) {
      nextProps.configWechatSharing({
        title: '【指点】' + nextProps.consultation.param.article.title,
        desc: nextProps.consultation.param.article.summary,
        link: `${config.baseUrl}/consultation/` + nextProps.params.id,
        imgUrl: nextProps.consultation.param.article.cover
      });
    }
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchConsultation(this.props.params.id);
  }
}

export default WechatWrapper(Consultation);