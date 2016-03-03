/**
 * Created by luowei on 3/3/16.
 */
import React from 'react';
class Friend extends React.Component {
  render() {
    let owner = this.props.friend.owner;
    let coupon = this.props.friend.coupon;

    return (
      <li className="fd-item">
        <div className="item-info">
          <div className="fd-avatar">
            <img src={owner.avatar }/>
          </div>
          <div className="fd-msg">
            <div className="fd-msg-head">
              <span className="fd-name">{owner.loginName || owner.name || '匿名'}</span>
              <span className="fd-time">{coupon.timePlaced}</span>
            </div>
            <div className="fd-content-wrap">
              <div className="fd-comment">
                导师，我来了，带我飞吧~~~
              </div>
              <div className="fd-money">
                {coupon.actualAmount}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Friend;
