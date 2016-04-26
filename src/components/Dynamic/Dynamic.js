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
        <Helmet title={decodeURIComponent(dynamic.user.loginName||dynamic.user.name)+'-'+decodeURIComponent(dynamic.expert.title)} />
        <TopBanner dialog={dialog} actions={actions}/>
        <DynamicContent dialog={dialog} actions={actions} dynamic={dynamic} />
        {comment}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (!nextProps.loadedConfig && nextProps.dynamic.activityEvent) {
        let dynamic = nextProps.dynamic.activityEvent,
            user = nextProps.dynamic.user;
        let shareTitles = (['【指点】噢～我鲜为人知的一面被你发现了','【指点】对于一个人了解全面些比较好，你也一样','【指点】经历的更多，人生才会充满欢笑'])[Math.floor(Math.random()*3)];
        // console.log(shareTitles);
        nextProps.configWechatSharing({
            title: shareTitles,
            desc: decodeURIComponent(dynamic.description),
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