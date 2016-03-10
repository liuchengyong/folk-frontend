/**
 * 爆料被删除
 * Created by HuangGuorui on 2/26/16.
 */
import React from 'react';
import Dialog from '../Common/Dialog';
let noBroke = require('../../images/del_broke.png');


class BrokeDel extends React.Component {

  DownApp() {
    this.props.actions.setDialogStatus(true);
  }
  CloseDialog() {
    this.props.actions.setDialogStatus(true);
  }

  render() {

    return (
    	<div className="broke-wrapper">
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