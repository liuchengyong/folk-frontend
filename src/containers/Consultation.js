/**
 * Created by luowei on 3/12/16.
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Consultation from '../components/Consultation';

class ConsultationDetail extends Component {
  render() {
    const {actions, consultation,params} = this.props;
    return <Consultation actions={actions} consultation={consultation} params={params}/>;
  }
}

ConsultationDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  consultation: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    consultation: state.consultation
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = {
    fetchConsultation: require('../actions/consult/fetchConsultation')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(ConsultationDetail);