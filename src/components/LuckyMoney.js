/**
 * Created by luowei on 2/27/16.
 */
import React from 'react';
import Header from './LuckyMoney/Header';
import Banner from './LuckyMoney/Banner';
import Content from './LuckyMoney/Content';
import Footer from './LuckyMoney/Footer';

class Coupon extends React.Component {
  render() {
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