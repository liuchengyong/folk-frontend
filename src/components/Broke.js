/**
 * 匿名爆料
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_broke.scss');

import React from 'react';
import Loading from './Loading';
import DeviceAdapter from '../common/deviceAdapter';
import TopBanner from './common/TopBanner';
import BrokeDesc from './BrokeDesc';

class BrokeComponent extends React.Component {
  render() {
    let dialog = this.props.dialog;
    let actions = this.props.actions;
    if(this.props.broke.isFetching) {
      return <Loading />
    }
    return (
      <div className="broke">
        <TopBanner />
        <BrokeDesc id={this.props.params.id} actions={actions} dialog={dialog} broke={this.props.broke} />
      </div>
    );
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchBrokeData(this.props.params.id);
  }
}

BrokeComponent.defaultProps = {};

export default BrokeComponent;