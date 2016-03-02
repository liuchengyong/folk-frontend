/**
 * Created by luowei on 3/2/16.
 */
import React from 'react';
let couponLogo = require('../../images/coupon-logo.png');

const Header = () => (
  <section className="hb-cover">
    <div className="company-head">
      <div className="logo">
        <img src={couponLogo}/>
      </div>
      <h1 className="title">指点</h1>
      <h2 className="des">传递真实透明的教育资讯</h2>
    </div>
  </section>
);

export default Header;

