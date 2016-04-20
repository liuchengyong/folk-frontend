/**
 * 专题详情
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_activity.scss');

import React from 'react';
import WechatWrapper from '../WechatWrapper';
// import Loading from '../Common/Loading';
import DeviceAdapter from '../../common/deviceAdapter';
import TopBanner from '../Common/TopBanner';

class ActiveComponent extends React.Component {
  render() {
      let dialog = this.props.dialog;
      let actions = this.props.actions;
    return (

      <div className="broke">
        <TopBanner actions={actions} dialog={dialog}/>
      </div>
    );
  }

  componentWillReceiveProps() {

  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
  }
}

ActiveComponent.defaultProps = {};

export default WechatWrapper(ActiveComponent);