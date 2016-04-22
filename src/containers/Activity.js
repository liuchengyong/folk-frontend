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
import Activity from '../components/Activity/Activity';

/* Populated by react-webpack-redux:reducer */
class ActiveContainer extends Component {
  render() {
    const { dialog, actions, active, params } = this.props;
    return <Activity dialog={dialog} actions={actions} active={active} params={params}/>;
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
ActiveContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  active: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    active: state.active,
    dialog: state.dialog
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    fetchActiveData: require('../actions/activity/fetchActiveData.js'),
    setDialogStatus: require('../actions/dialog/setDialogStatus.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ActiveContainer);