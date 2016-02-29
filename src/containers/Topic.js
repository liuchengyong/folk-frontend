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
import Topic from '../components/Topic';
/* Populated by react-webpack-redux:reducer */
class TopicContainer extends Component {
  render() {
    const {actions, topic, params, dialog} = this.props;
    // if(this.props.topic.isFetching) {
      // return <div>loading</div>
    // } else {
      return <Topic actions={actions} topic={topic} params={params} dialog={dialog} />;
    // }
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
TopicContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    topic: state.topic,
    dialog: state.dialog
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    fetchTopicData: require('../actions/topic/fetchTopicData.js'),
    requestTopicData: require('../actions/topic/requestTopicData.js'),
    receiveTopicData: require('../actions/topic/receiveTopicData.js'),

    openDialog: require('../actions/dialog/openDialog.js'),
    closeDialog: require('../actions/dialog/closeDialog.js'),
    setDialogStatus: require('../actions/dialog/setDialogStatus.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicContainer);
