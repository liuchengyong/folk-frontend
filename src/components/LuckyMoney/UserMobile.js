/**
 * Created by luowei on 3/7/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {default as classNames} from 'classnames';

class UserMobile extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true
    }
  }

  fetchCoupon() {
    this.props.fetchCoupon(ReactDOM.findDOMNode(this.refs.mobile).value);
  }

  checkPhoneNumber() {
    if (/^1[35678]\d{9}$|^147\d{8}$/.test(ReactDOM.findDOMNode(this.refs.mobile).value)) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }

  render() {
    let btnClass = classNames({
      'get-hb': true,
      'btn': true,
      'disabled': this.state.disabled
    });
    return (
      <div className="user-mobile">
        <input type="tel" className="phone" id="phone" ref="mobile"
               onKeyUp={this.checkPhoneNumber.bind(this)} placeholder="输入电话号码"/>
        <button className={btnClass} id="btnCoupon"
                onClick={this.fetchCoupon.bind(this)} {...this.state}>立即领取
        </button>
      </div>
    );
  }
}

export default UserMobile;