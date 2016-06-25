/**
 * 导师详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_expert.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import Helmet from 'react-helmet';
import config from 'config';
import TopBanner from '../Common/TopBanner';
import ExpertHeader from './ExpertHeader';
import ExpertDesc from './ExpertDesc';
import WechatWrapper from '../WechatWrapper';
import ExpertTopic from './ExpertTopic';
import ExpertComment from './ExpertComment';
import ExpertAnswer from './ExpertAnswer';
import { decodeString } from '../../common/string';
// import ExpertTeacher from './ExpertTeacher';

let logo_icon = require('../../images/icon/logo_icon.png');
class ExpertComponent extends React.Component {

  render() {

    let dialog = this.props.dialog;
    let actions = this.props.actions;
    let expert = this.props.expert;
    if(expert.isFetching) {
      return <Loading />
    }

    let title = expert.expert.user.name + ' - ' + expert.expert.expert.title;

    let topicsDom = null,
        expertComment = null,
        expertAnswer = null;
    if(expert.topics.length > 0){
      topicsDom = (<ExpertTopic expert={expert} />);
    }
    if(expert.comment.results.length > 0){
      expertComment = (<ExpertComment expert={expert} actions={actions}/>);
    }
    if(expert.answers.results.length > 0){
      expertAnswer = (<ExpertAnswer answers={expert.answers} actions={actions} />);
    }

    // if(expert.recommendExperts.results.length > 0){
    //   expertTeacher = (<ExpertTeacher teachers={expert.recommendExperts} />)
    // }
    return (
      <div className="expert">
        <Helmet title={title}/>
        <TopBanner actions={actions} dialog={dialog}/>
        <ExpertHeader actions={actions} dialog={dialog} expert={expert}/>
        <ExpertDesc expert={expert} actions={actions} dialog={dialog}/>
        {topicsDom}
        {expertComment}
        {expertAnswer}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && !nextProps.expert.isFetching) {
      var expert = nextProps.expert.expert;
      nextProps.configWechatSharing({
        title: `【指点】不要走那千篇一律的人生之路，我是 ${ decodeString(expert.user.name || expert.user.loginName || '匿名')} | ${expert.expert.title}`,
        desc: expert.expert.description,
        link: `${config.baseUrl}/expert/${this.props.params.id}`,
        imgUrl: expert.user.avatar || logo_icon
      });
    }
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchExpertData(this.props.params.id);
  }
}

ExpertComponent.defaultProps = {};

export default WechatWrapper(ExpertComponent);