/**
 * Created by HuangGuorui on 2/29/16.
 */
import React from 'react';
import Demo from './Demo';

require('styles/_menu.scss');

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pt: 'menu-item point',
      msg: 'menu-item message',
      follow: 'menu-item follow',
      mask: 'mask hide',
      show: false
    }
    // this.msgClass = 'menu-item';
  }
  showMenu() {
    this.setState({
      pt: 'menu-item point ani-pt',
      msg: 'menu-item message ani-msg',
      follow: 'menu-item follow ani-follow',
      mask: 'mask mk-show',
      show: true
    })
  }

  hideMenu() {
    this.setState({
      pt: 'menu-item point ani-pt-hide',
      msg: 'menu-item message ani-msg-hide',
      follow: 'menu-item follow ani-follow-hide',
      mask: 'mask hide',
      show: false
    })
  }

  toggleMenu() {
    if(this.state.show) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }
  render() {
    return (
          <div>
            <div className={this.state.mask}>
            </div>
            <div className="menu-wrapper">
              <ul className="menu-group">
                <li className={this.state.pt}>
                  <i></i>求指点
                </li>
                <li className={this.state.msg}>
                  <i></i>留言
                </li>
                <li className={this.state.follow}>
                  <i></i>关注
                </li>
              </ul>
              <div className="menu-btn" onClick={this.toggleMenu  .bind(this)} >
              </div>
            </div>
          </div>
    );
  }
}

export default Dialog;