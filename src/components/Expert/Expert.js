/**
 * 导师详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_broke.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import TopBanner from '../Common/TopBanner';
// import Dialog from '../Common/Dialog';

class ExpertComponent extends React.Component {

  render() {
    
    let dialog = this.props.dialog;
    // let actions = this.props.actions;
    // console.log(this.props);
    if(this.props.expert.isFetching) {
      return <Loading />
    }

    return (
      <div className="Expert">
        <TopBanner actions={this.props.actions} dialog={dialog}/>
        <button> </button>
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