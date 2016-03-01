/**
 * Created by HuangGuorui on 2/29/16.
 */
import React from 'react';
import Dialog from './Dialog';


require('styles/_menu.scss');


class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pt: 'menu-item point',
      msg: 'menu-item message',
      follow: 'menu-item follow',
      menuBtn: 'menu-btn',
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
      menuBtn: 'menu-btn ani-menu-btn',
      show: true
    })
  }

  hideMenu() {
    this.setState({
      pt: 'menu-item point ani-pt-hide',
      msg: 'menu-item message ani-msg-hide',
      follow: 'menu-item follow ani-follow-hide',
      mask: 'mask hide',
      menuBtn: 'menu-btn ani-menu-btn-back',
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
          <div>
            <div className={this.state.mask}>
            </div>
            <div className="menu-wrapper">
              <ul className="menu-group">
                <li className={this.state.pt} onClick={this.DownApp.bind(this)}>
                  <i></i>求指点
                </li>
                <li className={this.state.msg} onClick={this.DownApp.bind(this)}>
                  <i></i>留言
                </li>
                <li className={this.state.follow} onClick={this.DownApp.bind(this)}>
                  <i></i>关注
                </li>
              </ul>
              <div className={this.state.menuBtn} onClick={this.toggleMenu.bind(this)} >
              </div>
            </div>
            {dialog}
          </div>
    );
  }
}

export default Menu;