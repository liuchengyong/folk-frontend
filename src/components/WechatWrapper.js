/**
 * Created by luowei on 3/10/16.
 */
import React from 'react';
import config from 'config';
import wx from 'weixin-js-sdk';
import Loading from './Common/Loading';

let WechatWrapper = InnerComponent => class extends React.Component {
  constructor() {
    super();
    this.state = {
      loadedConfig: false,
      loadedSharing: false
    };
  }

  fetchWechatConfig() {
    return fetch(config.baseUrl + config.wechatAPI.config, {
      credentials: 'same-origin'
    });
  }

  configWechatSharing(data) {
    if (data) {
      wx.onMenuShareAppMessage(data);
      wx.onMenuShareTimeline(data);
      this.setState({loadedSharing: true});
    }
  }

  componentDidMount() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.fetchWechatConfig()
        .then(response => response.json())
        .then(SDK => {
          wx.config(SDK)
          this.setState({loadedConfig: true});
          wx.error((err)=> {
            alert('微信签名错误');
          });
        })
        .catch(err => {
          console.log(err);
          alert('获取微信配置错误');
        });
    }
  }

  render() {
    //if (!this.state.loadedConfig) {
    //  return <Loading />;
    //}
    return <InnerComponent {...this.props}
      loadedSharing={this.state.loadedSharing}
      configWechatSharing={this.configWechatSharing.bind(this)}/>
  }
};

export default WechatWrapper;