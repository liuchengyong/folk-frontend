/**
 * 注册
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_login.scss');

import React from 'react';
// import config from 'config';
// import Loading from '../Common/Loading';
import DeviceAdapter from '../../common/deviceAdapter';

class LoginComponent extends React.Component {

  //手机登录
  loginByMobile() {
    let mobile = this.refs.mobile.value.trim();
    let password = this.refs.MobilePassword.value.trim();
    let data = {
      mobile: mobile,
      password: password
    };
    this.props.actions.postLoginData(data, true);
  }

  loginByEmail() {
    let email = this.refs.email.value.trim();
    let password = this.refs.EmailPassword.value.trim();
    let data = {
      email: email,
      password: password
    };
    this.props.actions.postLoginData(data, false);
  }

  render() {
    return (
      <div className="login">
        <div className="login-mobile">
          <input type="tel" ref="mobile" placeholder="输入手机号" name="mobile"/>
          <input type="password" ref="MobilePassword" name="password"/>
          <button onClick={this.loginByMobile.bind(this, 'mobile')}>登录</button>
        </div>
        <div className="login-email">
          <input type="email" ref="email" placeholder="请输入邮箱" name="email"/>
          <input type="password" ref="EmailPassword"  name="password" />
          <button onClick={this.loginByEmail.bind(this)}>登录</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
  }
}

LoginComponent.defaultProps = {};

export default LoginComponent;