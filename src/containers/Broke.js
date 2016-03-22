/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Broke from '../components/Broke/Broke';

/* Populated by react-webpack-redux:reducer */
class BrokeContainer extends Component {
  render() {
    const {actions, broke, params, dialog} = this.props;
    return <Broke actions={actions} broke={broke} params={params} dialog={dialog} />;
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
BrokeContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  broke: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    broke: state.broke,
    dialog: state.dialog
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    fetchBrokeData: require('../actions/broke/fetchBrokeData.js'),
    requestBrokeData: require('../actions/broke/requestBrokeData.js'),
    receiveBrokeData: require('../actions/broke/receiveBrokeData.js'),

    setDialogStatus: require('../actions/dialog/setDialogStatus.js'),
    fetchCoupon: require('../actions/coupon/fetchCoupon')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(BrokeContainer);
