/**
 * 申请点师
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_applyExpert.scss');

import React from 'react';
// import config from 'config';
import Loading from '../Common/Loading';
import PubTopicContent from './PubTopicContent';

import { save2Local, getChildValue } from '../../common/helper';

class PubTopic extends React.Component {

  constructor(props) {
    super(props);
  }

  //获取子组件的input 值
  getChildValue(parentKey, childKey)  {
    return this.refs[parentKey].refs[childKey].value.trim()
  }

  save2Local() {
    console.log(this.refs.baseContent);
    var data = {
      name: this.getChildValue('baseContent', 'userName'),
      mobile: this.getChildValue('baseContent', 'mobile'),
      password: this.getChildValue('baseContent', 'password'),
    };
    this.getChildValue('baseContent', 'userName')
    var data = {'key': 1234, 'key2': 345};
    save2Local('ApplyExpertData', data);
  }

  render() {
    // if(this.props.uploadToken.isFetching) {
    //   return <Loading/>
    // }
    return(
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
        			<li className="nav-item base-info ppre-step">
        				基本信息
        			</li>
        			<li className="nav-item expert-info pre-step">
        				点师资料
        			</li>
        			<li className="nav-item publish-topic current">
        				发布话题
        			</li>
        			<li className="nav-item preview-expert next-step">
        				资料预览
        			</li>
        		</ul>
        	</div>
          <PubTopicContent />
          <button onClick={this.save2Local.bind(this)} className="next-page base-next">下一步</button>
        </div>
      </div>
    );
  }

  componentDidMount() {

    // this.props.actions.fetchToken();

  }
}

PubTopic.defaultProps = {};

export default PubTopic;