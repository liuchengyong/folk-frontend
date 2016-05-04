/**
 * 导师详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_dynamic.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import Helmet from 'react-helmet';
import config from 'config';
import TopBanner from '../Common/TopBanner';
import Delete from '../Common/Delete';

import DynamicContent from './DynamicContent';
import DynamicMsg from './DynamicMsg';

import WechatWrapper from '../WechatWrapper';


// import Dialog from '../Common/Dialog';

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
        let dynamic = nextProps.dynamic.activityEvent,
            user = nextProps.dynamic.user;
        let shareTitles = (['【指点】噢～我鲜为人知的一面被你发现了','【指点】对于一个人了解全面些比较好，你也一样','【指点】经历的更多，人生才会充满欢笑'])[Math.floor(Math.random()*3)];
        let desc = nextProps.dynamic.activityEvent ? decodeURIComponent(dynamic.title || dynamic.description) : '动态已被删除';
        nextProps.configWechatSharing({
            title: shareTitles,
            desc:  desc,
            link: `${config.baseUrl}/dynamic/` + this.props.params.id,
            imgUrl: user.avatar
        });
    }
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchDynamicData(this.props.params.id);
  }
}

DynamicComponent.defaultProps = {};

export default WechatWrapper(DynamicComponent);