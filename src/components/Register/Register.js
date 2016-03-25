/**
 * 注册
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_register.scss');

import React from 'react';
// import config from 'config';
// import Loading from '../Common/Loading';
import DeviceAdapter from '../../common/deviceAdapter';

class RegisterComponent extends React.Component {

  getCaptch () {
    let mobile = this.refs.mobile.value;
    this.props.actions.fetchCaptch(mobile);
  }

  //手机注册
  registerByMobile() {
    let mobile = this.refs.mobile.value.trim();
    let captcha = this.refs.captcha.value.trim();
    let password = this.refs.password.value.trim();
    let data = {
      mobile: mobile,
      captcha: captcha,
      password: password
    };
    this.props.actions.postRegisterData(data, true);
  }

  registerByEmail() {
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let data = {
      email: email,
      password: password
    };
    this.props.actions.postRegisterData(data, false);
  }

  render() {
    return (
      <div className="register">
        <div className="register-mobile">
          <input type="tel" ref="mobile" placeholder="输入手机号" name="mobile"/>
          <input type="text" ref="captcha" autoComplete="off" placeholder="验证码" name="captcha"/>
          <input type="password" ref="password"  name="password" />
          <button onClick={this.getCaptch.bind(this)}>发送验证码</button>
          <button onClick={this.registerByMobile.bind(this, 'mobile')}>注册</button>
        </div>
        <div className="register-email">
          <input type="email" ref="email" placeholder="请输入邮箱" name="email"/>
          <input type="password" ref="password"  name="password" />
          <button onClick={this.registerByEmail.bind(this)}>注册</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
  }
}

RegisterComponent.defaultProps = {};

export default RegisterComponent;