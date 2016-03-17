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
      alert('config shareing');
      alert(JSON.stringify(data));
      wx.onMenuShareAppMessage(data);
      wx.onMenuShareTimeline(data);
      this.setState({loadedSharing: true});
    }
  }

  componentDidMount() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      let self = this;
      this.fetchWechatConfig()
        .then(response => response.json())
        .then(SDK => {
          wx.config(SDK);
          wx.ready(() => {
            self.setState({loadedConfig: true});
          });
          wx.error((err)=> {
            console.error(err);
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    return <InnerComponent {...this.props}
      loadedSharing={this.state.loadedSharing}
      loadedConfig={this.state.loadedConfig}
      configWechatSharing={this.configWechatSharing.bind(this)}/>
  }
};

export default WechatWrapper;