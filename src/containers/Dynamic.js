/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be Expertn though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Expert from '../components/Expert/Expert';
import Dynamic from '../components/Dynamic/Dynamic';

/* Populated by react-webpack-redux:reducer */
class DynamicContainer extends Component {
  render() {
    const {actions, dynamic, params, dialog } = this.props;
    // console.log(params);
    return <Dynamic actions={actions} dialog={dialog} dynamic={dynamic} params={params} />;
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
DynamicContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  dynamic: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    dynamic: state.dynamic,
    dialog: state.dialog
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    fetchDynamicData: require('../actions/dynamic/fetchDynamicData.js'),
    setDialogStatus: require('../actions/dialog/setDialogStatus.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(DynamicContainer);
