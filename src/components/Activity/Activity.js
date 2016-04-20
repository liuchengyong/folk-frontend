/**
 * 专题详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_activity.scss');

import React from 'react';
import WechatWrapper from '../WechatWrapper';
import Loading from '../Common/Loading';
import DeviceAdapter from '../../common/deviceAdapter';
import TopBanner from '../Common/TopBanner';

class ActiveComponent extends React.Component {
  render() {
    console.log(this.props);
    let dialog = this.props.dialog;
    let actions = this.props.actions;
    let active = this.props.active;

    if (active.isFetching) {
      return <Loading />
    }
    return (

      <div className="activity">
        <TopBanner actions={actions} dialog={dialog}/>
      </div>
    );
  }

  componentWillReceiveProps() {

  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
    this.props.actions.fetchActiveData('D1A5E0C3-1871-478D-8779-7075233AF3AE');
  }
}

ActiveComponent.defaultProps = {};

export default WechatWrapper(ActiveComponent);