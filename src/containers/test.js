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
import Answer from '../components/Answer/test';

/* Populated by react-webpack-redux:reducer */
class AnswerContainer extends Component {
  render() {
    const {actions, answer, params, dialog , user} = this.props;
    return <Answer actions={actions} dialog={dialog} answer={answer} params={params} user={user}/>;
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
AnswerContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    answer: state.answer,
    dialog: state.dialog,
    user: state.user
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    fetchAnswerData: require('../actions/answer/fetchAnswerData.js'),
    setDialogStatus: require('../actions/dialog/setDialogStatus.js'),
    fetchAnswerDetailData: require('../actions/answer/fetchAnswerDetailData.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(AnswerContainer);
