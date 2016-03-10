/**
 * Created by HuangGuorui on 2/29/16.
 */
import React from 'react';
require('styles/_dialog.scss');

let logo = require('../../images/icon/logo_icon.png');

class Dialog extends React.Component {

  closeDialog() {
    this.props.actions.setDialogStatus(false);
  }

  render() {
    return (
      <div className="show">
        <div className="dialog-bg"></div>
        <div className="dialog">
          <div className="close-btn" onClick={this.closeDialog.bind(this)}>
            <i></i>
          </div>
          <div className="content">
            <div className="dialog-tips">
              <div className="logo">
                <img src={logo}/>
              </div>
              <div className="dialog-tips-text">该功能需要指点客户端支持</div>
            </div>
            <div className="dialog-title">
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.luoteng.folk" className="down-app down-btn">立即打开</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;