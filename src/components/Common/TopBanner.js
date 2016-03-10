/**
 * Created by HuangGuorui on 3/8/16.
 */
import React from 'react';
import Dialog from '../Common/Dialog';

require('styles/_topBanner.scss');

let banner_logo = require('../../images/banner_logo.png');

class TopBanner extends React.Component {

  DownApp() {
  this.props.actions.setDialogStatus(true);
  }
  CloseDialog() {
    this.props.actions.setDialogStatus(true);
  }

  render() {

    let dialog = null;
    if(this.props.dialog.isOpening){
      dialog = <Dialog actions={this.props.actions}/>
    } else {
      dialog = null;
    }

    return (
      <div className="top-banner">
        {dialog}
        <div className="banner-logo">
          <img src={banner_logo} />
        </div>
        <div className="more banner-down-app">
          <span onClick={this.DownApp.bind(this)} className="more-btn">更多</span>
        </div>
      </div>
    );
  }
}

export default TopBanner;