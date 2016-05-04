/**
 * 专题详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_activity.scss');

import React from 'react';
import WechatWrapper from '../WechatWrapper';
import config from 'config';
import Loading from '../Common/Loading';
import DeviceAdapter from '../../common/deviceAdapter';
import TopBanner from '../Common/TopBanner';
import ActiveBanner from './ActiveBanner';
import TopicItem from './TopicItem';

class ActiveComponent extends React.Component {
  render() {
    let dialog = this.props.dialog;
    let actions = this.props.actions;
    let active = this.props.active;


    if(active.isFetching) {
      return <Loading />
    }

    return (
      <div className="activity">
        <TopBanner actions={actions} dialog={dialog}/>
        <ActiveBanner active={active}/>
        <TopicItem active={active}/>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && nextProps.active.article) {
      let active = nextProps.active;
      var link = `${config.baseUrl}/activity/` + this.props.params.id;

      nextProps.configWechatSharing({
        title: active.article.title,
        desc: active.article.summary,
        link: link,
        imgUrl: active.article.sharedCover || active.article.topCover
      });
    }
  }

  componentDidMount() {
    var id = this.props.params.id || 'D1A5E0C3-1871-478D-8779-7075233AF3AE';
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchActiveData(id);
  }
}

ActiveComponent.defaultProps = {};

export default WechatWrapper(ActiveComponent);



