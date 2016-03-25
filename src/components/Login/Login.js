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

  getCaptch () {
    let mobile = this.refs.mobile.value;
    this.props.actions.fetchCaptch(mobile);
  }

  //手机注册
  loginByMobile() {
    let mobile = this.refs.mobile.value.trim();
    let captcha = this.refs.captcha.value.trim();
    let password = this.refs.password.value.trim();
    let data = {
      mobile: mobile,
      captcha: captcha,
      password: password
    };
    this.props.actions.postLoginData(data, true);
  }

  loginByEmail() {
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
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
          <input type="text" ref="captcha" autoComplete="off" placeholder="验证码" name="captcha"/>
          <input type="password" ref="password"  name="password" />
          <button onClick={this.getCaptch.bind(this)}>发送验证码</button>
          <button onClick={this.loginByMobile.bind(this, 'mobile')}>注册</button>
        </div>
        <div className="login-email">
          <input type="email" ref="email" placeholder="请输入邮箱" name="email"/>
          <input type="password" ref="password"  name="password" />
          <button onClick={this.loginByEmail.bind(this)}>注册</button>
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