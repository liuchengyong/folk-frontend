/**
 * 点师详情--点师介绍
 */
import React from 'react';
import Dialog from '../Common/Dialog';

class ExpertDesc extends React.Component {

  DownApp() {
    this.props.actions.setDialogStatus(true);
  }
  render() {
    let dialog = null;
    if(this.props.dialog.isOpening){
      dialog = <Dialog actions={this.props.actions}/>
    } else {
      dialog = null;
    }

   let expert = this.props.expert.expert;
   let expertInfo = expert.expert;
    return (
    <div className="teacher_introduce">
      {dialog}
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
        <span onClick={this.DownApp.bind(this)} className="teacher_introduce_more">
            更多动态
        </span>
    </div>
    );
  }
}

export default ExpertDesc;