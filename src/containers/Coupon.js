import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LuckyMoney from '../components/LuckyMoney';

class Coupon extends Component {
  render() {
    const {actions, coupon} = this.props;
    return <LuckyMoney actions={actions} coupon={coupon}/>;
  }
}

Coupon.propTypes = {
  actions: PropTypes.object.isRequired,
  coupon: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    coupon: state.coupon
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = {
    fetchWechatConfig: require('../actions/coupon/fetchWechatConfig.js'),
    requestWechatConfig: require('../actions/coupon/requestWechatConfig.js'),
    receiveWechatConfig: require('../actions/coupon/receiveWechatConfig.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Coupon);
