/**
 * 注册
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_register.scss');

import React from 'react';

// import config from 'config';
import helper from '../../common/helper';
import DeviceAdapter from '../../common/deviceAdapter';

const Msg = {
  MOBILE_EMPTY_ERROR: '手机号码不能为空',
  MOBILE_FORMAT_ERROR: '请填写正确的手机号',
  MOBILE_EXITED_ERROR: '手机号码已经注册,请直接登录',
  
  EMAIL_EMPTY_ERROR: '邮箱不能为空',
  EMAIL_FORMAT_ERROR: '邮箱格式错误',
  EMAIL_REGISTERED_ERROR : '邮箱已经注册,请直接登录',

  VCODE_EMPTY_ERROR: '验证码不能为空',
  VCODE_FORMAT_ERROR: '请确认验证码为6位数字',

  PASSWORD_FORMAT_ERROR: '密码不可以少于6位'
}

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

    if(!/^(1[34578])[0-9]{9}$/.test(mobile)) { //手机号码不正确&&为空
      helper.showToast(Msg.MOBILE_FORMAT_ERROR);
      return false;
    }
    if(!/^[0-9]{6}$/.test(captcha)) {
      helper.showToast(Msg.VCODE_FORMAT_ERROR);
      return false;
    }

    if(password.length < 6) {
      helper.showToast(Msg.PASSWORD_FORMAT_ERROR);
      return false;
    }

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

    if(!/^[0-9a-zA-Z\.\_-]+@([0-9a-zA-Z-]+\.)+[a-zA-Z]{2,4}$/.test(email)) {
      helper.showToast(Msg.EMAIL_FORMAT_ERROR);
      return false;
    }

    if(password.length < 6) {
      helper.showToast(Msg.PASSWORD_FORMAT_ERROR);
      return false;
    }

    let data = {
      email: email,
      password: password
    };
    this.props.actions.postRegisterData(data, false);
  }

  render() {
    return (
      <div className="register">
        <div className="header-nav">
          <i className="back_ico"></i>
        </div>
        <div className="logo-wrap">
          <div className="logo">
            <span className="helper"></span>
            <img src="../../images/logo_register.png" alt="logo"/>
          </div>
        </div>


        <div className="register-mobile">

          <div className="phone-wrap">
            <span className="country-code">
             +86
            </span>
            <input type="tel" ref="mobile" className="iphone-ipt" placeholder="输入手机号" name="mobile"/>
          </div>
          <div className="code-wrap">
            <input className="code-ipt" type="text" ref="captcha" placeholder="验证码" name="captcha"/>
            <button className="code" onClick={this.getCaptch.bind(this)}>获取验证码</button>
          </div>
          <div className="pwd-wrap">
            <input type="password" ref="password"  className="pwd-ipt" name="password" placeholder="请输入密码"/>
            <button className="toggle-pwd">显示</button>
          </div>
          <div className="sub-btn">
            <button onClick={this.registerByMobile.bind(this, 'mobile')}>注册</button>
          </div>
          <div className="email-tab">
            邮箱注册
          </div>
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