/**
 * Created by luowei on 3/10/16.
 */
import React from 'react';
import wx from 'weixin-js-sdk';
import config from 'config';

let WechatWrapper = InnerComponent => class extends React.Component {

  render(){
    return <InnerComponent {...this.props}/>
  }

  componentWillReceiveProps(nextProps) {
    let states = nextProps.coupon;
    if (!states.loadedSDK && !states.isFetching) {
      let coupon = states.coupon;
      let couponPackage = coupon && coupon.param && coupon.param.couponPackage || {};
      let doneWechatConfig = nextProps.actions.doneWechatConfig;
      wx.config(states.sdkConfig);
      wx.ready(() => {
        doneWechatConfig();
        let shareData = {
          //todo need to pass from server
          title: couponPackage.title || '指点微信红包',
          name: couponPackage.displayName,
          desc: couponPackage.description,
          link: `${config.baseUrl}/main/coupon?pid=${config.couponId}`,
          imgUrl: couponPackage.icon || config.couponIcon
        };
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
      });
      wx.error(()=> {
        alert('wechat config error');
      });
    }
  }

  componentDidMount() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //check code or pid
      this.props.actions.fetchWechatConfig();
    }
  }
};

export default WechatWrapper;