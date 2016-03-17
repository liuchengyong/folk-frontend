/**
 * Created by luowei on 3/2/16.
 */
import React from 'react';
import Friend from './Friend';
import UserMobile from './UserMobile';

class Content extends React.Component {

  render() {
    let coupon = this.props.coupon || {};
    let param = coupon.param || {};
    let friends = param && param.list ? param.list.results : [];
    return (
      <div className="content-wrapper">
        {(() => {
          if (coupon.code == 224) {
            return <UserMobile fetchCoupon={this.props.fetchCoupon}/>
          }
        })()}
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
            {friends.map((friend, index) => {
              return <Friend key={friend.owner.id} friend={friend} index={index}/>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Content;