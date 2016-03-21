/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
import config from 'config';
import Article from './Consultation/Article';
import Topics from './Consultation/Topics';
import WechatWrapper from './WechatWrapper';
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

    let title = consultation.param.article.title;
    console.log(param.topics.length);
    return (
      <div className='detailbox'>
        <Helmet title={title} />
        <Article article={param.article || {}}/>
        {(()=>{
          if (param.topics.length > 0) {
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
        desc: nextProps.consultation.param.article.content,
        link: `${config.baseUrl}/consultation/` + nextProps.params.id,
        imgUrl: nextProps.consultation.param.article.cover
      });
    }
  }

  componentDidMount() {
    this.props.actions.fetchConsultation(this.props.params.id);
  }
}

export default WechatWrapper(Consultation);