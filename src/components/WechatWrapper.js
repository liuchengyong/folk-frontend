/**
 * Created by luowei on 3/10/16.
 */
import React from 'react';
import wx from 'weixin-js-sdk';

let WechatWrapper = InnerComponent => class extends React.Component {
  render(){
    return <InnerComponent {...this.props}/>
  }

  componentWillReceiveProps(nextProps) {
    let states = nextProps.wechat;
    if (!states.loadedSDK && states.SDK ) {
      wx.config(states.SDK);
      wx.ready(() => {
        nextProps.actions.doneWechatConfig();
      });
      wx.error(()=> {
        alert('wechat config error');
      });
    }
    if (!states.loadedShare && states.shareData) {
      wx.onMenuShareAppMessage(states.shareData);
      wx.onMenuShareTimeline(states.shareData);
      nextProps.actions.doneWechatShareConfig();
    }
  }

  componentDidMount() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.props.actions.fetchWechatConfig();
    }
  }
};

export default WechatWrapper;