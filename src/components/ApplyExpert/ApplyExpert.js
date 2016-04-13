/**
 * 申请点师
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_applyExpert.scss');

import React from 'react';
// import config from 'config';
import Loading from '../Common/Loading';
import assign from 'lodash/assign';
import regexHelper from '../../common/regexHelper';
import { save2Local} from '../../common/helper';

import ApplyExpertBaseContent from './ApplyExpertBaseContent';

class ApplyComponent extends React.Component {

  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      nextTips : '',
      showTips: false,
      roleTips: false
    };
    this.nextTips = '请将信息填写完整';
    this.tipsData = {};
  }

  //获取子组件的input 值
  getChildValue(parentKey, childKey)  {
    return this.refs[parentKey].refs[childKey].value.trim()
  }

  nextStep() {

    let baseContent = this.refs.baseContent;

    let username = this.getChildValue('baseContent', 'userName');
    let mobile = this.getChildValue('baseContent', 'mobile');
    let bool = true
    if(!regexHelper.username(username)) {
      this.nextTips = '请填写你正确的真实姓名';
      baseContent.setState({
        username: 2
      });
      bool = false
      //show ipt tips
    }
    if(!regexHelper.mobile(mobile)) {
      bool = false

      this.nextTips = '请填写正确的手机号';
      baseContent.setState({
        mobile: 2
      });
    }
    if(!(baseContent.state.femaleActive || baseContent.state.maleActive)) {
      bool = false

      this.nextTips = '请选择性别';
      baseContent.setState({
        genderStatus: 'show'
      });
    } else {

    }
    if(!baseContent.refs.upImage.idImgUrl[0]) {
      bool = false
      console.log(baseContent.refs.upImage);
      this.nextTips = '请上传正确的头像';
      baseContent.refs.upImage.setState({
        showTips: true
      })
      baseContent.setState({
        avatarStatus: 'show'
      });
    } else {

    }
    if(!(baseContent.idImgUrl.length > 0)) {
      bool = false
      this.nextTips = '请至少上传一张证件';
    }
    if(!(baseContent.state.student || baseContent.state.parent || baseContent.state.teacher)) {
      bool = false
      this.nextTips = '请选择角色';
      this.setState({
        roleTips: true
      });
    } else {
      this.setState({
        roleTips: false
      });
    }

    if(baseContent.state.student){
      if(!baseContent.refs.studentInfo.eduInfo.level) {
        bool = false
        this.nextTips = '请选择学历';
      }
      if(!baseContent.refs.studentInfo.eduInfo.school) {
        bool = false
        this.nextTips = '请选择你的学校';
      }
      if(!baseContent.refs.studentInfo.eduInfo.entry) {
        this.nextTips = '请选择入学时间';
      }
      if(!baseContent.refs.studentInfo.refs.major.value) {
        bool = false
        this.nextTips = '请填写专业';
      }
    }

    if(bool) {
      this.nextTips = '';
      this.save2Local();
    }
    // console.log()
    this.setState({
      nextTips: this.nextTips
    });

  }

  //前置条件:所有通过验证
  save2Local() {
    let username = this.getChildValue('baseContent', 'userName');
    let mobile = this.getChildValue('baseContent', 'mobile');
    let gener = this.refs.baseContent.femaleActive ? 'female' : 'male'; //前置条件: 必须选择之一
    let avatar = this.refs.baseContent.refs.upImage.idImgUrl[0].key;
    let role = this.refs.baseContent.state.student ? 'student' :
              (this.refs.baseContent.state.parent ? 'parent' : 'teacher');
    let idCarImg = this.refs.baseContent.idImgUrl; //array

    var data = {
      name: username,
      mobile: mobile,
      gener: gener,
      avatar: avatar,
      role: role,
      idCarImg: idCarImg
    };

    if(this.refs.baseContent.state.student) {
      assign(data, this.refs.baseContent.refs.studentInfo.eduInfo, {major: this.refs.baseContent.refs.studentInfo.refs.major.value});
    }
    // console.log(data);
    save2Local('ApplyExpertData', data);

    // setTimeout(function() {
    //   location.href += '?step=2'; 
    // }, 300)
  }

  render() {
    if(this.props.uploadToken.isFetching) {
      return <Loading/>
    }
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
        			<li className="nav-item base-info current">
        				基本信息
        			</li>
        			<li className="nav-item expert-info next-step">
        				点师资料
        			</li>
        			<li className="nav-item publish-topic nnext-step">
        				发布话题
        			</li>
        			<li className="nav-item preview-expert nnext-step">
        				资料预览
        			</li>
        		</ul>
        	</div>
        	<ApplyExpertBaseContent token={this.props.uploadToken} ref="baseContent" actions={this.props.actions} collegeByCountry={this.props.collegeByCountry} roleTips={this.state.roleTips} showTips={this.state.showTips} data={this.tipsData}/>
          <span className="next-tips"> {this.state.nextTips} </span>
          <button onClick={this.nextStep.bind(this)} className="next-page base-next">下一步</button>
        </div>
      </div>
    );
  }

  componentDidMount() {

    this.props.actions.fetchToken();
    // this.props.actions.fetchCollegeCountry('CHINA')

  }
}

ApplyComponent.defaultProps = {};

export default ApplyComponent;