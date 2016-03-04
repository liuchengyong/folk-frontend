/**
 * Created by luowei on 3/2/16.
 */
import React from 'react';
import Friend from './Friend';

class Content extends React.Component {
  render() {
    let friends = this.props.coupon.param.list.results;
    return (
      <div className="content-wrapper">
        <input type="tel" className="phone" id="phone" placeholder="输入电话号码"/>
        <button className="get-hb btn" id="btnCoupon">立即领取</button>
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
            {friends.map((friend) => {
              return <Friend key={friend.owner.id} friend={friend} />
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Content;