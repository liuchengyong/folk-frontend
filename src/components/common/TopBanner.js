/**
 * Created by HuangGuorui on 3/8/16.
 */
import React from 'react';
require('styles/_topBanner.scss');

let banner_logo = require('../../images/banner_logo.png');

class TopBanner extends React.Component {
  render() {
    return (
          <div className="top-banner">
            <div className="banner-logo">
              <img src={banner_logo} / >
            </div>
            <div className="more banner-down-app">
              <span className="more-btn">更多</span>
            </div>
          </div>
    );
  }
}

export default TopBanner;