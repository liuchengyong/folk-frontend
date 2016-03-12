/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
import Article from './Consultation/Article';
import Topics from './Consultation/Topics';
import WechatWrapper from './WechatWrapper';
import Loading from './Common/Loading';
require('styles/_consultation.scss');

class Consultation extends React.Component {
  render() {
    let consultation = this.props.consultation;
    if (consultation.isFetching) {
      return <Loading />;
    }

    let param = consultation.param || {};
    return (
      <div className='detailbox'>
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