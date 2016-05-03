/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be Expertn though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Expert from '../components/Expert/Expert';
import College from '../components/College/College';

/* Populated by react-webpack-redux:reducer */
class CollegeContainer extends Component {
  render() {
    const {actions, college, params, dialog } = this.props;
    return <College actions={actions} dialog={dialog} college={college} params={params} />;
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
CollegeContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  college: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    college: state.college,
    dialog: state.dialog
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    fetchCollegeData: require('../actions/college/fetchCollegeData.js'),
    setDialogStatus: require('../actions/dialog/setDialogStatus.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(CollegeContainer);
