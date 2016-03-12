/**
 * Created by luowei on 3/12/16.
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Consultation from '../components/Consultation';

class ConsultationDetail extends Component {
  render() {
    const {actions, consultation, wechat, params} = this.props;
    return <Consultation actions={actions} consultation={consultation} wechat={wechat} params={params}/>;
  }
}

ConsultationDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  consultation: PropTypes.object.isRequired,
  wechat: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    consultation: state.consultation,
    wechat: state.wechat
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = {
    fetchWechatConfig: require('../actions/wechat/fetchWechatConfig'),
    doneWechatConfig: require('../actions/wechat/doneWechatConfig'),
    doneWechatShareConfig: require('../actions/wechat/doneWechatShareConfig'),
    fetchConsultation: require('../actions/consult/fetchConsultation')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(ConsultationDetail);