require('normalize.css');
require('styles/_topic.scss');

import React from 'react';
import config from 'config';
import Loading from '../Common/Loading';
import Helmet from 'react-helmet';
import TopicDesc from './TopicDesc';
import TopBanner from '../Common/TopBanner';
import WechatWrapper from '../WechatWrapper';
import LatestComment from './LatestComment';
import LatestMsg from './LatestMsg';
import DeviceAdapter from '../../common/deviceAdapter';
import { decodeString,paresHtmlToText } from '../../common/string';
import Menu from '../Common/Menu';

class TopicComponent extends React.Component {
  render() {

    let topic = this.props.topic.topic,
        expert = this.props.topic.expert,
        comment = this.props.topic.comment,
        message = this.props.topic.relateMessages,
        tags = this.props.topic.tag,
        dialog = this.props.dialog;

    if(this.props.topic.isFetching) {
      return <Loading />
    }

    let title = topic.title;

    //没有评论
    let _LatestComment = '';
    if(comment.results.length > 0) {
      _LatestComment = <LatestComment comment={comment} dialog={dialog} actions={this.props.actions}/>;
    }

    return (
      <div className="topic-wrapper">
        <Helmet title={title}/>
        <TopBanner actions={this.props.actions} dialog={dialog} />
        <TopicDesc topic={topic} expert={expert} tags={tags}/>
        { _LatestComment}
        <LatestMsg message={message} />
        <Menu dialog={dialog} actions={this.props.actions} />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && !nextProps.topic.isFetching) {
      var topic = nextProps.topic.topic,
          expert = nextProps.topic.expert;
      nextProps.configWechatSharing({
        title: `【指点】${topic.title} | ${decodeString(expert.user.name || expert.user.loginName || '匿名')}|${expert.expert.title}`,
        desc: paresHtmlToText(topic.description),
        link: `${config.baseUrl}/topic/${this.props.params.id}`,
        imgUrl: expert.user.avatar || config.shareLogeIcon
      });
    }
  }
  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchTopicData(this.props.params.id);
  }
}

TopicComponent.defaultProps = {};

export default WechatWrapper(TopicComponent);