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

class Coupon extends React.Component {

  constructor() {
    super();
    this.state = {
      loadedSDK: false
    }
  }

  render() {
    let states = this.props.coupon;
    let coupon = states.coupon;
    let sdkConfig = states.sdkConfig;
    if (states.isFetching) {
      return <Loading />
    }

    let self = this;
    if (!this.state.loadedSDK) {
      wx.config(sdkConfig);
      wx.ready(() => {
        self.setState({loadedSDK: true});
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
        {
          (()=> {
            if (coupon.param) {
              return <Content coupon={coupon}/>
            }
          })()
        }
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