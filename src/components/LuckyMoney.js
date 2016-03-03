/**
 * Created by luowei on 2/27/16.
 */
import config from 'config';
import React from 'react';
import wx from 'weixin-js-sdk';
import Header from './LuckyMoney/Header';
import Banner from './LuckyMoney/Banner';
import Content from './LuckyMoney/Content';
import Footer from './LuckyMoney/Footer';
import Loading from './Loading';

const wechatAPI = config.wechatAPI;
let ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  //check code or pid
  if (!/code|pid/.test(location.search)) {
     location.href = wechatAPI.auth;
  }
}

class Coupon extends React.Component {
  render() {
    if(this.props.coupon.isFetching) {
      return <Loading />
    }
    return (
      <section className="coupon-container">
        <Header />
        <Banner />
        <Content />
        <Footer />
      </section>
    )
  }
}

export default Coupon;