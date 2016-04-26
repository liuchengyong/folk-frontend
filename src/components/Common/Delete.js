/**
 * 爆料被删除
 * Created by HuangGuorui on 2/26/16.
 */
require('styles/_delete.scss');

import React from 'react';
let icon_delete = require('../../images/del_broke.png');


class Delete extends React.Component {

  DownApp() {
    this.props.actions.setDialogStatus(true);
  }

  render() {
    return (
      <div className="delete_content">
        <img src={icon_delete} onClick={this.DownApp.bind(this)}/>
        <span onClick={this.DownApp.bind(this)}>{this.props.msg}</span>
      </div>
    );
  }
}

export default Delete;