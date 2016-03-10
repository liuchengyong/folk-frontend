import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Coupon from '../components/Coupon';

class CouponContainer extends Component {
  render() {
    const {actions, coupon, wechat} = this.props;
    return <Coupon actions={actions} coupon={coupon} wechat={wechat}/>;
  }
}

CouponContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  coupon: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    coupon: state.coupon,
    wechat: state.wechat
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = {
    fetchWechatConfig: require('../actions/wechat/fetchWechatConfig'),
    doneWechatConfig: require('../actions/wechat/doneWechatConfig'),
    fetchCoupon: require('../actions/coupon/fetchCoupon')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);
