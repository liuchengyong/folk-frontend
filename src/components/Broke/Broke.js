/**
 * 匿名爆料
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_broke.scss');

import React from 'react';
import config from 'config';
import Loading from '../Common/Loading';
import DeviceAdapter from '../../common/deviceAdapter';
import WechatWrapper from '../WechatWrapper';
import TopBanner from '../Common/TopBanner';
import BrokeDesc from './BrokeDesc';
import BrokeDel from './BrokeDel';

class BrokeComponent extends React.Component {
  render() {
    let dialog = this.props.dialog;
    let actions = this.props.actions;

    if (this.props.broke.isFetching) {
      return <Loading />
    }

    let brokeData = null;
    if (this.props.broke.results) {

      brokeData = <BrokeDesc id={this.props.params.id} actions={actions} dialog={dialog} broke={this.props.broke}/>
    } else {
      brokeData = <BrokeDel actions={actions} dialog={dialog}/>;
    }

    return (
      <div className="broke">
        <TopBanner actions={actions} dialog={dialog}/>
        {brokeData}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && nextProps.broke.results) {
      let broke = nextProps.broke;
      if (broke.results.length > 0) {
        var desc = decodeURI(broke.results[0].comment.content);
        var link = `${config.baseUrl}/main/broke/` + this.props.params.id;
        var imgUrl = 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
      } else {
        var desc = '该爆料已被删除';
        var link = `${config.baseUrl}/main/broke/` + this.props.params.id;
        var imgUrl = 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
      }
      nextProps.configWechatSharing({
        title: '分享个爆料',
        desc: desc,
        link: link,
        imgUrl: imgUrl
      });
    }
  }

  componentDidMount() {
    // this.props.actions.fetchCoupon();
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchBrokeData(this.props.params.id);
  }
}

BrokeComponent.defaultProps = {};

export default WechatWrapper(BrokeComponent);