/**
 * 导师详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/expert/_expert.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import TopBanner from '../Common/TopBanner';
import ExpertHeader from './ExpertHeader';
import ExpertDesc from './ExpertDesc';
import ExpertTopic from './ExpertTopic';
import ExpertComment from './ExpertComment';
// import Dialog from '../Common/Dialog';

class ExpertComponent extends React.Component {

  render() {
    
    let dialog = this.props.dialog;
    let actions = this.props.actions;
    let expert = this.props.expert;
    if(this.props.expert.isFetching) {
      return <Loading />
    }

    return (
      <div className="expert">
      <TopBanner actions={actions} dialog={dialog}/>
        <ExpertHeader actions={actions} dialog={dialog} expert={expert}/>
        <ExpertDesc expert={expert} actions={actions} dialog={dialog}/>
        <ExpertTopic expert={expert} />
        <ExpertComment expert={expert} dialog={dialog} actions={actions}/>
      </div>
    );
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchExpertData(this.props.params.id);
  }
}

ExpertComponent.defaultProps = {};

export default ExpertComponent;