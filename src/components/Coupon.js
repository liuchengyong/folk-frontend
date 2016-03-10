/**
 * Created by luowei on 2/27/16.
 */
import React from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import wx from 'weixin-js-sdk';
import WechatWrapper from './WechatWrapper';
import Header from './LuckyMoney/Header';
import Banner from './LuckyMoney/Banner';
import Content from './LuckyMoney/Content';
import Footer from './LuckyMoney/Footer';
import Loading from './Common/Loading';

class Coupon extends React.Component {

  render() {

    let wechatStates = this.props.wechat;
    if (wechatStates.isFetching || !wechatStates.loadedSDK) {
      return <Loading />
    }
    let coupon = this.props.coupon;
    return (
      <section className="coupon-container">
        <Helmet title='指点微信红包' />
        <Header />
        <Banner coupon={coupon}/>
        <Content coupon={coupon} fetchCoupon={this.props.actions.fetchCoupon}/>
        <Footer />
      </section>
    );
  }

  componentDidMount() {
    this.props.actions.fetchCoupon();
  }
}

export default WechatWrapper(Coupon);