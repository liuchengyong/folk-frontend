import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';

class ActiveBanner extends React.Component {
  render() {

    let imgUrl = this.props.active.article.topCover;
    return (

      <div className="header">
        <img src={imgUrl}/>
      </div>
    );
  }

  componentDidMount() {
    DeviceAdapter.setFrontSize();
  }
}

ActiveBanner.defaultProps = {};

export default ActiveBanner;