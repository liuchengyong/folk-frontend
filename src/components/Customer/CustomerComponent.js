/**
 * 导师详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_customer.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import config from 'config';

import Loading from '../Common/Loading';
import Helmet from 'react-helmet';
import TopBanner from '../Common/TopBanner';
import WechatWrapper from '../WechatWrapper';

import { decodeString,paresHtmlToText } from '../../common/string';

class CustomerComponent extends React.Component {

  download(){
    this.props.actions.setDialogStatus(true);
  }
  render() {
    let dialog = this.props.dialog,
        actions = this.props.actions,
        customer = this.props.customer;

    if(customer.isFetching) {
      return <Loading />
    }
    let user = customer.user,
        expertList = customer.likedExpert,
        topicList = customer.likedTopic;
    return (
      <div className="customer-container">
        <Helmet title={'点友详情'} />
        <TopBanner actions={actions} dialog={dialog}/>
        <div className="customer-header">
          <img className="customer-header-avatar" src={user.avatar} />
          <span className="customer-header-name">{decodeString(user.name || user.loginName || '匿名')}</span>
          <span className="customer-header-position">{user.position}</span>
        </div>
        <div className="customer-wrapper">
          <div className="customer-wrapper-header">
            自我介绍
          </div>
          <div className="customer-introduction">{user.introduction}</div>
        </div>
        {
          expertList.totalSize > 0 ? (
            <div className="customer-wrapper">
              <div className="customer-wrapper-header">
                关注点师
                <span className="customer-wrapper-more" onClick={this.download.bind(this)}>更多</span>
              </div>
              {
                expertList.results.map((expert,index) => {
                  return index > 1 ? null : (
                    <div className="customer-expert" key={expert.expert.userId}>
                      <img className="customer-expert-avatar" src={expert.user.avatar} />
                      <div className="customer-expert-person">
                        <span className="customer-expert-name">{decodeString(expert.user.name || expert.user.loginName || '匿名')}</span>
                        <span className="customer-expert-title">{expert.expert.title}</span>
                      </div>
                      <div className="customer-expert-like">{expert.favoriteCount > 9 ? expert.favoriteCount : '0' + expert.favoriteCount}</div>
                      <div className="customer-expert-appointment">{expert.appointmentTimes > 9 ? expert.appointmentTimes : '0' + expert.appointmentTimes}</div>
                    </div>);
                })
              }
            </div>
          ) : null
        }
        {
          topicList.totalSize > 0 ?(
            <div className="customer-wrapper">
              <div className="customer-wrapper-header">
                关注话题
                <span className="customer-wrapper-more" onClick={this.download.bind(this)}>更多</span>
              </div>
              {topicList.results.map((topic,index)=>{
                return index > 1 ? null :(
                    <div className="customer-topic" key={topic.id}>
                      <div className="customer-topic-header">
                        <img className="customer-topic-avatar" src={topic.expert.user.avatar}/>
                        <span className="customer-topic-name">{decodeString(topic.expert.user.name || topic.expert.user.loginName || '匿名')}</span>
                        <span className="customer-topic-title">{topic.expert.expert.title}</span>
                      </div>
                      <div className="customer-topic-content">
                        <span className="customer-topic-qustion">{topic.title}</span>
                        <span className="customer-topic-price">{'¥'+topic.amount+'/次'}</span>
                      </div>
                      <div className="customer-topic-des">{paresHtmlToText(topic.description)}</div>
                      <div className="customer-topic-bottom">
                          <span className="customer-topic-duration">{`约${topic.duration}分钟`}</span>
                          <span className="customer-topic-appointmentTimes">{topic.appointmentTimes + '人求指点'}</span>
                      </div>
                    </div>
                  );
              })}
            </div>
            ):null
        }
        {
          expertList.totalSize == 0 && topicList.totalSize == 0 ? (
            <div className="customer-null">
              <span>点友还没有任何关注～～</span>
            </div>
            ) : null
        }
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && !nextProps.customer.isFetching) {
      var customer = nextProps.customer;
      nextProps.configWechatSharing({
        title: `【指点】 找名师，来指点，我是${decodeString(customer.user.name || customer.user.loginName || '匿名')} | ${customer.user.position}`,
        desc: customer.user.introduction,
        link: `${config.baseUrl}/customer/${this.props.params.id}`,
        imgUrl: customer.user.avatar || config.shareLogeIcon
      });
    }
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchCustomerData(this.props.params.id);
  }
}

CustomerComponent.defaultProps = {};

export default WechatWrapper(CustomerComponent);