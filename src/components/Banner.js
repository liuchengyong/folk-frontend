/**
 * Created by luowei on 2/24/16.
 */
import React from 'react';

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <img className="banner-cover" src={this.props.cover}  />
        <div className="banner-desc">{this.props.content}</div>
        <hr/>
      </div>
    );
  }
}

export default Banner;