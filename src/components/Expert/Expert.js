/**
 * 导师详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_expert.scss');

import React from 'react';
import Helmet from 'react-helmet';
import config from 'config';


import DeviceAdapter from '../../common/deviceAdapter';
import { decodeString } from '../../common/string';


import Loading from '../Common/Loading';
import TopBanner from '../Common/TopBanner';


import WechatWrapper from '../WechatWrapper';
import ExpertTopic from './ExpertTopic';
import ExpertAnswer from './ExpertAnswer';
import ExpertDynamic from './ExpertDynamic';
let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');
class ExpertComponent extends React.Component {
  DownApp() {
    this.props.actions.setDialogStatus(true);
  }
  changeTab(type){
    this.props.actions.fetchExpertChangeTab(type);
  }
  render() {
    let { dialog, actions, expert} = this.props;
    if(expert.isFetching) {
      return <Loading />
    }
    let expertInfo = expert.expert;

    let title = expert.expert.user.name + ' - ' + expert.expert.expert.title;
    
    return (
      <div className="expert-container">
        <Helmet title={title}/>
        <TopBanner actions={actions} dialog={dialog}/>
        <div className="expert-header">
            <img className="expert-header-avatar" src={ expertInfo.user.avatar || ic_me_avatar_default} />
            <span className="expert-header-favoriteCount">{expertInfo.favoriteCount}</span>
            <span className="expert-header-name">{decodeString(expertInfo.user.name || expertInfo.user.loginName || '匿名')}</span>
            <span className="expert-header-other">{`${expertInfo.views}人浏览 · ${expertInfo.appointmentTimes}人求指点 · ${expert.answers.totalSize}个益答 · 约${expertInfo.expert.replyTime >= 24 ? parseInt(expertInfo.expert.replyTime/24) +'天' : expertInfo.expert.replyTime + '小时' }回复`}</span>
            <span className="expert-header-title">{expertInfo.expert.title}</span>
            <span className="expert-header-like" onClick={this.DownApp.bind(this)}>＋关注</span>
        </div>
        <div className="expert-tab">
          <span className={expert.current == 'detail' ? 'selected' : ''} onClick={this.changeTab.bind(this,'detail')}>点师介绍</span>
          <span className={expert.current == 'topic' ? 'selected' : ''} onClick={this.changeTab.bind(this,'topic')}>话题</span>
          <span className={expert.current == 'answer' ? 'selected' : ''} onClick={this.changeTab.bind(this,'answer')}>益答</span>
          <span className={expert.current == 'dynamic' ? 'selected' : ''} onClick={this.changeTab.bind(this,'dynamic')}>动态</span>
        </div>
        {
          expert.current == 'detail' ? (
            <div className="expert-introduce">
              <img className="expert-introduce-descriptionPicture" src={expertInfo.expert.descriptionPicture} />
              <p className="expert-introduce-description">{expertInfo.expert.description}</p>
            </div>) : null
        }
        {
          expert.current == 'topic' ? (<ExpertTopic topics={expert.topics} comments={expert.comment} experts={expert.recommendExperts} actions={actions} />) : null
        }
        {
          expert.current == 'answer' ? (<ExpertAnswer answers={expert.answers} actions={actions} />) : null
        }
        {
          expert.current == 'dynamic' ? (<ExpertDynamic dynamic={expert.dynamics} actions={actions} />) : null
        }

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
        imgUrl: expert.user.avatar || config.shareLogeIcon
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