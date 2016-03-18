/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
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

    return (
      <div className='detailbox'>
        <Helmet title={title} />
        <Article article={param.article || {}}/>
        {(()=>{
          if (param.topics) {
            return <Topics topics={param.topics || {}}/>
          }
        })()}
      </div>
    );
  }

  componentDidMount() {
    this.props.actions.fetchConsultation(this.props.params.id);
  }
}

export default WechatWrapper(Consultation);