/**
 * Created by luowei on 2/27/16.
 */
import React from 'react';
import Helmet from 'react-helmet';
import WechatWrapper from './WechatWrapper';
import Header from './LuckyMoney/Header';
import Banner from './LuckyMoney/Banner';
import Content from './LuckyMoney/Content';
import Footer from './LuckyMoney/Footer';
import Loading from './Common/Loading';

class Coupon extends React.Component {

  render() {
    let states = this.props.coupon;
    if (states.isFetching || !states.loadedSDK) {
      return <Loading />
    }
    return (
      <section className="coupon-container">
        <Helmet title='指点微信红包' />
        <Header />
        <Banner coupon={states.coupon}/>
        <Content coupon={states.coupon} fetchCoupon={this.props.actions.fetchCoupon}/>
        <Footer />
      </section>
    );
  }
}

export default WechatWrapper(Coupon);