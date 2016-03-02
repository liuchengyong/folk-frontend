/**
 * Created by luowei on 3/2/16.
 */
import React from 'react';

const Content = () => (
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
);

export default Content;