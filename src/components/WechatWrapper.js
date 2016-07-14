/**
 * Created by luowei on 3/10/16.
 */
import React from 'react';
import config from 'config';
import wx from 'weixin-js-sdk';

let WechatWrapper = InnerComponent => class extends React.Component {
  constructor() {
    super();
    this.state = {
      loadedConfig: false,
      isWeixin: navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
    };
  }

  fetchWechatConfig() {
    return fetch(config.baseUrl + config.wechatAPI.config, {
      credentials: 'same-origin'
    });
  }

  configWechatSharing(data) {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger' && data) {
      let self = this;
      this.fetchWechatConfig()
        .then(response => response.json())
        .then(SDK => {
          wx.config(SDK);
          wx.ready(() => {
            wx.onMenuShareAppMessage(data);
            wx.onMenuShareTimeline(data);
            wx.onMenuShareQQ(data);
            wx.onMenuShareWeibo(data);
            wx.onMenuShareQZone(data);
            self.setState({loadedConfig: true});
          });
          wx.error((err)=> {
            // alert(JSON.stringify(err));
            JSON.stringify(err);
          });
        })
        .catch(err => {
          // alert(JSON.stringify(err));
          JSON.stringify(err);
        });
    }
  }

  render() {
    return <InnerComponent {...this.props}
      loadedConfig={this.state.loadedConfig}
      isWeixin = {this.state.isWeixin}
      configWechatSharing={this.configWechatSharing.bind(this)}/>
  }
};

export default WechatWrapper;