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
import ApplyExpert from '../components/ApplyExpert/ApplyExpert';
import AddExpertInfo from '../components/ApplyExpert/AddExpertInfo';
import PubTopic from '../components/PubTopic/PubTopic';
import ApplyResult from '../components/ApplyExpert/ApplyResult';

/* Populated by react-webpack-redux:reducer */
class ApplyExpertContainer extends Component {
  render() {
    const {actions, uploadToken, collegeByCountry, verifyExpert, applyExpert} = this.props;
    var query = this.props.location.query;
    
    var stepOneLocal = window.localStorage.getItem('ApplyExpertData');
    var stepTwoLocal = window.localStorage.getItem('ApplyExpertDataTwo');
    var TopicData = window.localStorage.getItem('TopicData');

    if(query.step == 1) {
      return <ApplyExpert actions={actions} uploadToken={uploadToken} verifyExpert={verifyExpert} collegeByCountry={collegeByCountry}/>; // move to else default
    } else if(query.step == 2) {
      if(!stepOneLocal) {
        return window.location.href = '/applyExpert';
      }
      return <AddExpertInfo actions={actions} uploadToken={uploadToken} />;
    } else if(query.step == 3) {
      if(!stepTwoLocal) {
        return window.location.href = '/applyExpert';
      }
      return <PubTopic actions={actions} uploadToken={uploadToken} applyExpert={applyExpert}/>;
    } else if(query.step == 4) {
      if(!TopicData) {
        return window.location.href = '/applyExpert';
      } else {
        window.localStorage.clear('*');
      }
      return <ApplyResult applyExpert={applyExpert} />;
    } else {
      return <ApplyExpert actions={actions} uploadToken={uploadToken} verifyExpert={verifyExpert} collegeByCountry={collegeByCountry}/>; // move to else default
    }
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
ApplyExpertContainer.propTypes = {
  actions: PropTypes.object.isRequired
  // broke: PropTypes.object.isRequired,
  // params: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    uploadToken: state.uploadToken,
    collegeByCountry: state.collegeByCountry,
    verifyExpert: state.verifyExpert,
    applyExpert: state.applyExpert
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    fetchToken: require('../actions/uploadToken/fetchToken.js'),
    fetchCollegeCountry: require('../actions/collegeList/fetchCollegeCountry.js'),
    verifyExpert: require('../actions/verifyExpert/verifyExpert.js'),
    postExpertData: require('../actions/applyExpert/postExpertData.js')

    // requestApplyExpertData: require('../actions/broke/requestApplyExpertData.js'),
    // receiveApplyExpertData: require('../actions/broke/receiveApplyExpertData.js'),
    // setDialogStatus: require('../actions/dialog/setDialogStatus.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ApplyExpertContainer);