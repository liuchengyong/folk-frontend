/**
 * 导师详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_dynamic.scss');

import React from 'react';

import DeviceAdapter from '../../common/deviceAdapter';
import { decodeString,paresHtmlToText,getFirstImgSrc} from '../../common/string';
import Loading from '../Common/Loading';
import Helmet from 'react-helmet';
import config from 'config';
import TopBanner from '../Common/TopBanner';
import Delete from '../Common/Delete';

import DynamicContent from './DynamicContent';
import DynamicMsg from './DynamicMsg';

import WechatWrapper from '../WechatWrapper';

class DynamicComponent extends React.Component {

  render() {
    if(this.props.dynamic.isFetching) {
      return <Loading />;
    }

    let dialog = this.props.dialog;
    let actions = this.props.actions;
    let dynamic = this.props.dynamic;

    if(!dynamic.activityEvent){
      return (
        <div className="delete_wrapper">
          <Helmet title={'已删除动态'} />
          <TopBanner dialog={dialog} actions={actions}/>
          <Delete dialog={dialog} msg={'动态已被删除'}  actions={actions}/>
        </div>
      )
    }

    let comment = null;
    if(dynamic.comments.results.length != 0){
        comment = <DynamicMsg dialog={dialog} actions={actions} dynamic={dynamic}/>;
    }

    return (
      <div className="dynamic">
        <Helmet title={decodeURIComponent(dynamic.user.name||dynamic.user.loginName||'匿名')+'-'+decodeURIComponent(dynamic.expert.title || dynamic.description)} />
        <TopBanner dialog={dialog} actions={actions}/>
        <DynamicContent dialog={dialog} actions={actions} dynamic={dynamic} />
        {comment}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) { // 考虑删除
    if (!nextProps.loadedConfig && !nextProps.dynamic.isFetching) {
        let share = {
            link: `${config.baseUrl}/dynamic/${this.props.params.id}`
        };
        if(!nextProps.dynamic.activityEvent){
            share.title = '【指点】 动态已被删除';
            share.desc = '动态已被删除';
            share.imgUrl = 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
        }else{
          let dynamic = nextProps.dynamic.activityEvent,
            expert = nextProps.dynamic.expert,
            user = nextProps.dynamic.user;
          if(dynamic.type == 'VIDEO'){
            share.title = `【指点】${decodeString(user.name || user.loginName || '匿名')} | ${expert.title} 分享了一个视频`;
            share.desc = decodeString(dynamic.description);
            share.imgUrl = 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
          }else{
            share.title = `【指点】${decodeString(dynamic.title)}`;
            share.desc = paresHtmlToText(decodeString(dynamic.description));
            share.imgUrl = getFirstImgSrc(decodeString(dynamic.description)) || 'http://7xqxpm.com1.z0.glb.clouddn.com/headline_128.png';
          }
        }
        nextProps.configWechatSharing(share);
    }
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchDynamicData(this.props.params.id);
  }
}

DynamicComponent.defaultProps = {};

export default WechatWrapper(DynamicComponent);