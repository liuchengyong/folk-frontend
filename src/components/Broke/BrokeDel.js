/**
 * 爆料被删除
 * Created by HuangGuorui on 2/26/16.
 */
import React from 'react';
let noBroke = require('../../images/del_broke.png');
import Dialog from '../Common/Dialog';


class BrokeDel extends React.Component {

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

    return (
      <div className="broke-wrapper">
        {dialog}
        <div className="broke-del">
          <div className="del-content">
            <img src={noBroke} />
            <span>该爆料已被删除</span>
          </div>
        </div>
        <div className="more-broke">
          <button onClick={this.DownApp.bind(this)}> 打开指点查看更多评论</button>
        </div>
      </div>
    );
  }
}

export default BrokeDel;