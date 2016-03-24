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
import FoundSchool from '../components/FoundSchool';
/* Populated by react-webpack-redux:reducer */
class Found extends Component {
  render() {
    const {actions, school} = this.props;
      return <FoundSchool actions={actions} school={school}/>;
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
Found.propTypes = {
  actions: PropTypes.object.isRequired,
  school: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    school: state.school
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    fetchKeyWordData: require('../actions/found/fetchKeyWordData.js'),
    requestKeyWordData: require('../actions/found/requestKeyWordData.js'),
    receiveKeyWordData: require('../actions/found/receiveKeyWordData.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(Found);
