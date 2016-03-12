/**
 * 点师详情--点师介绍
 */
import React from 'react';

class ExpertDesc extends React.Component {

  render() {
   
   let expert = this.props.expert.expert;
   let user = expert.user;
   let expertInfo = expert.expert;
    return (
    <div className="teacher_introduce">
        <div className="teacher_introduce_title">
           <span className="teacher_introduce_title_text">点师介绍</span>
        </div>
        <div className="teacher_introduce_content">
              <p>
                <img src={expertInfo.descriptionPicture} />
            </p>
            <p>
                {expertInfo.description}
            </p>

        </div>
        <span className="teacher_introduce_more">
            更多动态
        </span>
    </div>
    );
  }
}

export default ExpertDesc;