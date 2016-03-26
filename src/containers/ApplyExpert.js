/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component
  // PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ApplyExpert from '../components/ApplyExpert/ApplyExpert';

/* Populated by react-webpack-redux:reducer */
class ApplyExpertContainer extends Component {
  render() {
    // const {actions, broke, params, dialog} = this.props;
    return <ApplyExpert />;
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
ApplyExpertContainer.propTypes = {
  // actions: PropTypes.object.isRequired,
  // broke: PropTypes.object.isRequired,
  // params: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return state;
  /* Populated by react-webpack-redux:reducer */
  // const props = {
  //   broke: state.broke,
  //   dialog: state.dialog
  // };
  // return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    // fetchApplyExpertData: require('../actions/broke/fetchApplyExpertData.js'),
    // requestApplyExpertData: require('../actions/broke/requestApplyExpertData.js'),
    // receiveApplyExpertData: require('../actions/broke/receiveApplyExpertData.js'),
    // setDialogStatus: require('../actions/dialog/setDialogStatus.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ApplyExpertContainer);