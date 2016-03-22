/**
 * 登录注册
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_login.scss');

import React from 'react';
// import Helmet from 'react-helmet';
// import config from 'config';
// import Loading from '../Common/Loading';
import DeviceAdapter from '../../common/deviceAdapter';
// import TopBanner from '../Common/TopBanner';

class LoginComponent extends React.Component {

  getCaptch () {
    console.log(this.refs.mobile.value);
    let mobile = this.refs.mobile.value;
    this.props.actions.fetchCaptch(mobile);
  }

  render() {
    return (
      <div className="login">
        <input type="tel" ref="mobile" placeholder="输入手机号" name="mobile"/>
        <input type="text" placeholder="验证码" name="captcha"/>
        <input type="password" name="password" />
        <button onClick={this.getCaptch.bind(this)}>发送验证码</button>
        <button>注册</button>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props);
    // this.props.actions.fetchCoupon();
    DeviceAdapter.setFrontSize();
    // this.props.actions.fetchBrokeData(this.props.params.id);
  }
}

LoginComponent.defaultProps = {};

export default LoginComponent;