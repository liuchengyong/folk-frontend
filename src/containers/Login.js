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
import Login from '../components/Login/Login';

/* Populated by react-webpack-redux:reducer */
class LoginContainer extends Component {
  render() {
    const {actions, login, captch} = this.props;
    return <Login actions={actions} login={login} captch={captch}/>;
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
LoginContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    login: state.login
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    postLoginData: require('../actions/login/postLoginData.js'),
    requestLoginData: require('../actions/login/requestLoginData.js'),
    receiveLoginData: require('../actions/login/receiveLoginData.js')

  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
