/**
 * Created by luowei on 2/27/16.
 */
import React from 'react';
import Header from './LuckyMoney/Header';
import Banner from './LuckyMoney/Banner';

class Coupon extends React.Component {
  render() {
    return (
      <div>
        <div className="top-bg"></div>
        <Header />
        <Banner />
        <div className="content-wrapper">
          <input type="tel" className="phone" id="phone" placeholder="输入电话号码"/>
          <button className="get-hb btn" id="btnCoupon" disabled="disabled">立即领取</button>
          <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.luoteng.folk"
             className="btn btn-block btn-primary btn-open"
             id="btnShare">
            <button className="down-app btn">下载指点客户端</button>
          </a>
          <div className="friends-wrap">
            <div className="friends-title">
              <span className="title-border"></span>
              <span className="title-content">看看朋友们的手气如何</span>
              <span className="title-border"></span>
            </div>
            <ul className="friends-group">
              <li className="fd-item">
                <div className="item-info">
                  <div className="fd-avatar">
                    <img src="<%= ret.friends[i].avatar %>"/>
                  </div>
                  <div className="fd-msg">
                    <div className="fd-msg-head">
                      <span className="fd-name"></span>
                      <span className="fd-time"></span>
                    </div>
                    <div className="fd-content-wrap">
                      <div className="fd-comment">
                      </div>
                      <div className="fd-money">
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="activity-intro">
          <div className="friends-title">
            <span className="title-border"></span>
            <span className="title-content">活动细则</span>
            <span className="title-border"></span>
          </div>
          <li>1. 使用红包时的预约导师手机号需为抢红包时使用的手机号，红包有过期时间限制。</li>
          <li>2. 发放至手机号的红包需要在【指点APP】用手机号注册，或将手机号绑定至指点账户后才能使用。</li>
          <li>3. 发放至指点账户的红包登录后即可使用。</li>
          <li>4. 红包仅限在线支付时使用，每张订单仅限使用一张红包，红包不找零。</li>
          <li>5. 指点保留法律范围内允许的对活动的解释权。</li>
        </div>
      </div>
    )
  }
}

export default Coupon;