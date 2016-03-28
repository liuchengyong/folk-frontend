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
import Register from '../components/Register/Register';

/* Populated by react-webpack-redux:reducer */
class RegisterContainer extends Component {
  render() {
    const {actions, register, captch} = this.props;
    return <Register actions={actions} register={register} captch={captch}/>;
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
RegisterContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  register: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    register: state.register
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    postRegisterData: require('../actions/register/postRegisterData.js'),
    requestRegisterData: require('../actions/register/requestRegisterData.js'),
    receiveRegisterData: require('../actions/register/receiveRegisterData.js'),
    fetchCaptch: require('../actions/register/fetchCaptch.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
