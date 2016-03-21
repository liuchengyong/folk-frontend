/**
 * 匿名爆料
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_broke.scss');

import React from 'react';
import Helmet from 'react-helmet';
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
    let broke = this.props.broke;

    if (broke.isFetching) {
      return <Loading />
    }

    let brokeData = null;
    let title = null;
    if (broke.totalSize) {
      title = decodeURI(broke.results[0].comment.content);
      brokeData = <BrokeDesc id={this.props.params.id} actions={actions} dialog={dialog} broke={broke}/>
    } else {
      title = '已删除爆料';
      brokeData = <BrokeDel actions={actions} dialog={dialog}/>;
    }

    // broke.totalSize
    return (
      <div className="broke">
        <Helmet title={title}/>
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
        var link = `${config.baseUrl}/broke/` + this.props.params.id;
        var imgUrl = 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
      } else {
        var desc = '该爆料已被删除';
        var link = `${config.baseUrl}/broke/` + this.props.params.id;
        var imgUrl = 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
      }
      nextProps.configWechatSharing({
        title: '【指点】嘘~~自己知道就好，一定不要和别人去说',
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