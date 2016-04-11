/**
 * 申请点师
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_applyExpert.scss');

import React from 'react';
// import config from 'config';
import Loading from '../Common/Loading';

import ExpertInfoContent from './ExpertInfoContent';
// import DeviceAdapter from '../../common/deviceAdapter';

class AddExpertInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.uploadToken.isFetching) {
      return <Loading />
    }
    return (
      <div className="apply">
        <div className="header">
        	<div className="header-wrap">
        		<span className="helper"></span>
        		<img src="../../images/logo_register.png"/>
        		<span className="title">指点·成为点师</span>
        	</div>
        </div>
        <div className="tips">
        	<p>未来的点师,您好:</p>
			    <p>&nbsp;&nbsp;&nbsp;&nbsp;这里是指点,一个传递知识,改变教育,共享,互助,成长的平台.这里有很多想您一样优秀和喜欢分享的人。</p>
			    <p>&nbsp;&nbsp;&nbsp;&nbsp;为了保证平台质量以及您的利益,希望您能够耐心填写完下面的资料。
			    请保证资料的详细及真实性,只有这样才会更容易通过审核和更多的人来预约与您交谈。</p>
             <span className="thx">谢谢。</span>
             <div className="clear"></div>
        </div>
        <div className="container ">
        	<div className="main-nav">
        		<ul className="nav-group">
        			<li className="nav-item base-info pre-step">
        				基本信息
        			</li>
        			<li className="nav-item expert-info current ">
        				点师资料
        			</li>
        			<li className="nav-item publish-topic next-step">
        				发布话题
        			</li>
        			<li className="nav-item preview-expert nnext-step">
        				资料预览
        			</li>
        		</ul>
        	</div>
        	<ExpertInfoContent token={this.props.uploadToken} />

        </div>
      </div>
    );
  }

  componentDidMount() {

    this.props.actions.fetchToken();

  }
}

AddExpertInfo.defaultProps = {};

export default AddExpertInfo;