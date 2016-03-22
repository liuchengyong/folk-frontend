/**
 * Created by luowei on 2/27/16.
 */
import React from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import Loading from './Common/Loading';
import WechatWrapper from './WechatWrapper';
import Header from './LuckyMoney/Header';
import Banner from './LuckyMoney/Banner';
import Content from './LuckyMoney/Content';
import Footer from './LuckyMoney/Footer';

class Coupon extends React.Component {

  render() {
    if (this.props.coupon.fetchingCoupon) {
      return <Loading />;
    }

    let coupon = this.props.coupon;
    return (
      <section className="coupon-container">
        <Helmet title='指点微信红包'/>
        <Header />
        <Banner coupon={coupon}/>
        <Content coupon={coupon} fetchCoupon={this.props.actions.fetchCoupon}/>
        <Footer />
      </section>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && nextProps.coupon.code == 0) {
      let coupon = nextProps.coupon;
      let couponPackage = coupon.param && coupon.param.couponPackage || {};
      let pid = /pid=([\w|-]+)&?/.exec(location.search);
      nextProps.configWechatSharing({
        title: couponPackage.displayName,
        desc: couponPackage.description,
        link: `${config.baseUrl}/coupon?pid=${pid && pid[1]}`,
        imgUrl: couponPackage.icon || config.couponIcon
      });
    }
  }

  componentDidMount() {
    this.props.actions.fetchCoupon();
  }
}

export default WechatWrapper(Coupon);