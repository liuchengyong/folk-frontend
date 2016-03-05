/**
 * Created by luowei on 3/2/16.
 */
import React from 'react';

class Banner extends React.Component {
  render() {
    let coupon = this.props.coupon;
    let shareUser = coupon.param ? coupon.param.shareUser : {};

    let generateBanner = (coupon) => {
      switch (coupon.code) {
        case 225:
          //todo done
          return (
            <div className="used-header">
              <span>红包已经抢光了</span>
            </div>
          );
        case 226:
          //todo expired
          return (
          <div className="used-header">
            <span>下次早点来~</span>
          </div>
          );
        case 205:
        //todo phone number used
          return (
            <div className="used-header">
              <span>该手机号码已经领取过红包了</span>
            </div>
          );
        default:
          return (
            <div className="used-wrap">
              <div className="used-avatar">
                <div className="user-avatar-wrap">
                  <img src={shareUser.avatar || 'http://statics.zhid58.com/img/share_hongbao.jpg'}/>
                </div>
              </div>
              <div className="used-msg">
                <div className="used-name">
                  Hi, 我是 {shareUser.loginName || shareUser.name || '匿名'}
                </div>
                <div className="admin-notice">
                  赶快领取属于你的优惠大礼包~
                </div>
              </div>
            </div>
          )
      }
    };

    return (
      <div className="banner-content">
        {generateBanner(coupon)}
      </div>

    )
  }
}

export default Banner;