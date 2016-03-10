/**
 * 匿名爆料
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_broke.scss');

import React from 'react';
import Loading from '../Common/Loading';
import DeviceAdapter from '../../common/deviceAdapter';
import TopBanner from '../Common/TopBanner';
import BrokeDesc from './BrokeDesc';
import BrokeDel from './BrokeDel';

class BrokeComponent extends React.Component {
  render() {
    let dialog = this.props.dialog;
    let actions = this.props.actions;

    if(this.props.broke.isFetching) {
      return <Loading />
    }

    let brokeData = null;
    if(this.props.broke.results) {
        
      brokeData = <BrokeDesc id={this.props.params.id} actions={actions} dialog={dialog} broke={this.props.broke} />
    } else {
      brokeData = <BrokeDel actions={actions} dialog={dialog} />;
    }

    return (
      <div className="broke">
        <TopBanner />
        {brokeData}
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