import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Coupon from '../components/Coupon';

class CouponContainer extends Component {
  render() {
    const {actions, coupon} = this.props;
    return <Coupon actions={actions} coupon={coupon}/>;
  }
}

CouponContainer.propTypes = {
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
    fetchCoupon: require('../actions/coupon/fetchCoupon')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);
