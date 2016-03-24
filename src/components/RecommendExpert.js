/**
 * Created by HuangGuorui on 2/25/16.
 */
import React from 'react';


class RecommendExpert extends React.Component {
  render() {
    let expert = this.props.user;
    return (
      <div className="expert-item">
        <img src={expert.avatar} className="avatar" />
        <span>{expert.name}</span>
        <span>{expert.educationList[0].college.name}</span>
      </div>
    )
  }
}

export default RecommendExpert;