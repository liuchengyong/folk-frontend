/**
 * 申请点师
 * @author HuangGuorui
 */

require('normalize.css');
require('styles/_applyExpert.scss');

import React from 'react';
// import config from 'config';
import Loading from '../Common/Loading';
import { save2Local, getFromLocal} from '../../common/helper';

import ExpertInfoContent from './ExpertInfoContent';
// import DeviceAdapter from '../../common/deviceAdapter';

const ReplyTime = [6, 12, 24, 48];

class AddExpertInfo extends React.Component {

  constructor(props) {
    super(props);
    this.nextTips = '';

  }

  nextStep() {
    let expertInfo = this.refs.expertInfo;

    if(expertInfo.refs.perPhoto.idImgUrl.length < 1) {
      this.nextTips = '请上传个人写真照片';
    } else if(!expertInfo.state.workYear) {
      this.nextTips = '请选择工作年限';
    } else if(!expertInfo.refs.activeCity.value) {
      this.nextTips = '请输入所在城市';
    } else if(!expertInfo.refs.activeArea.value) {
      this.nextTips = '请输入活动区域';
    } else if(!expertInfo.state.currentTime) {
      this.nextTips = '请选择回应时间';
    } else if(expertInfo.state.descLength < 50) {
      this.nextTips = '个人介绍至少50字';
    } else if(expertInfo.refs.expertBg.idImgUrl.length < 1) {
      this.nextTips = '请上传个性背景图片';
    } else {
      this.nextTips = '';
      this.save2Local();
    }
    this.setState({
      nextTips: this.nextTips
    });

  }

    //前置条件:所有通过验证
  save2Local() {
    let expertInfo = this.refs.expertInfo;

    let perPhoto = expertInfo.refs.perPhoto.idImgUrl[0].key;
    let workYear = expertInfo.state.workYear;
    let city = expertInfo.refs.activeCity.value;
    let area = expertInfo.refs.activeArea.value;
    let description = expertInfo.refs.description.value;
    let expertBg = expertInfo.refs.expertBg.idImgUrl[0].key;

    let inviter = expertInfo.refs.inviter && expertInfo.refs.inviter.value.trim();

    var data = {
      descriptionPicture: 'http://statics.zhid58.com/' + perPhoto,
      workYear: workYear,
      permanentCity: city,
      permanentArea: area,
      description: description,
      shortIntroductionPicture: 'http://statics.zhid58.com/' + expertBg,
      inviter: inviter,
      replyTime: ReplyTime[(expertInfo.state.currentTime - 1)]
    };
    save2Local('ApplyExpertDataTwo', data);

    setTimeout(function() {
      location.href = location.pathname  + '?step=3'; 
    }, 300)


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
        				申请成功
        			</li>
        		</ul>
        	</div>
        	<ExpertInfoContent token={this.props.uploadToken} actions={this.props.actions} ref="expertInfo"/>
          <span className="next-tips"> {this.nextTips} </span>

          <button onClick={this.nextStep.bind(this)} className="next-page base-next">下一步</button>

        </div>
      </div>
    );
  }

  componentDidMount() {
    // this.applyExpertLocalData = getFromLocal('ApplyExpertData');
    if(!getFromLocal('ApplyExpertData')) {
      location.href = location.pathname; 
    }
    this.props.actions.fetchToken();

  }
}

AddExpertInfo.defaultProps = {};

export default AddExpertInfo;