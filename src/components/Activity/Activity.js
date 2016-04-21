/**
 * 专题详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_activity.scss');

import React from 'react';
import WechatWrapper from '../WechatWrapper';
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
    console.log(nextProps);
    if (!nextProps.loadedConfig && nextProps.active.article) {
      let active = nextProps.active;
      nextProps.configWechatSharing({
        title: active.article.title,
        desc: active.article.summary,
        link: 'http://7xl9qr.com1.z0.glb.clouddn.com//ef2b61c1c021c3664e32aa6a1b6563db',
        imgUrl: active.article.topCover
      });
    }
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchActiveData('D1A5E0C3-1871-478D-8779-7075233AF3AE');
  }
}

ActiveComponent.defaultProps = {};

export default WechatWrapper(ActiveComponent);



