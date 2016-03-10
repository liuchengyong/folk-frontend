/**
 * Created by luowei on 2/27/16.
 */
import React from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import wx from 'weixin-js-sdk';
import Header from './LuckyMoney/Header';
import Banner from './LuckyMoney/Banner';
import Content from './LuckyMoney/Content';
import Footer from './LuckyMoney/Footer';
import Loading from './Common/Loading';

const pageTitle = '指点微信红包';
class Coupon extends React.Component {

  constructor() {
    super();
    this.state = {
      loadedSDK: false
    }
  }

  render() {
    let states = this.props.coupon;

    if (states.isFetching) {
      return <Loading />
    }

    let coupon = states.coupon;
    let sdkConfig = states.sdkConfig;
    let actions = this.props.actions;
    let couponPackage = coupon && coupon.param && coupon.param.couponPackage || {};
    let self = this;

    if (!this.state.loadedSDK) {
      wx.config(sdkConfig);
      wx.ready(() => {
        self.setState({loadedSDK: true});
        let shareData = {
          title: pageTitle,
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
      return <Loading />
    }

    return (
      <section className="coupon-container">
        <Helmet title={pageTitle} />
        <Header />
        <Banner coupon={coupon}/>
        <Content coupon={coupon} fetchCoupon={actions.fetchCoupon}/>
        <Footer />
      </section>
    );
  }

  componentDidMount() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //check code or pid
      this.props.actions.fetchWechatConfig();
    }
  }
}

export default Coupon;