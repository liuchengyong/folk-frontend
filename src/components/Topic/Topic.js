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
import Menu from '../Common/Menu';

class TopicComponent extends React.Component {
  render() {

    let topic = this.props.topic.topic;
    let expert = this.props.topic.expert;
    let comment = this.props.topic.comment;
    let message = this.props.topic.relateMessages;

    let dialog = this.props.dialog;

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
        <TopicDesc topic={topic} expert={expert}/>
        { _LatestComment }
        <LatestMsg message={message} />
        <Menu dialog={dialog} actions={this.props.actions} />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && nextProps.topic.topic) {
      var topic = nextProps.topic.topic;
      nextProps.configWechatSharing({
        title: topic.title,
        desc: topic.description,
        link: `${config.baseUrl}/topic/` + this.props.params.id,
        imgUrl: topic.previewImage
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