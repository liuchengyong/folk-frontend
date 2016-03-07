/**
 * Created by luowei on 2/27/16.
 */
import React from 'react';
import wx from 'weixin-js-sdk';
import Header from './LuckyMoney/Header';
import Banner from './LuckyMoney/Banner';
import Content from './LuckyMoney/Content';
import Footer from './LuckyMoney/Footer';
import Loading from './Loading';

class Coupon extends React.Component {

  constructor() {
    super();
    //todo merge state into redux
    this.state = {
      loadedSDK: false,
      shareDate: {}
    }
  }

  render() {
    let states = this.props.coupon;
    let coupon = states.coupon;
    let sdkConfig = states.sdkConfig;
    let actions = this.props.actions;
    let couponPackage;
    if (coupon && coupon.param) {
      couponPackage = coupon.param.couponPackage || {};
    }

    if (states.isFetching) {
      return <Loading />
    }

    let self = this;
    if (!this.state.loadedSDK) {
      wx.config(sdkConfig);
      wx.ready(() => {
        self.setState({loadedSDK: true});
        self.setState({shareDate: {
          name: couponPackage.displayName,
          desc: couponPackage.description,
          //todo need refactor
          link: 'http://wetest.zhid58.com/coupon?pid=09E572B6-CE9A-4D85-A63E-1ED6F2465BA2',
          imgUrl: couponPackage.icon || 'http://statics.zhid58.com/img/share_hongbao.jpg'
        }});
      });
      wx.error(()=> {
        console.log('wechat config error');
      });
      return <Loading />
    }

    return (
      <section className="coupon-container">
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