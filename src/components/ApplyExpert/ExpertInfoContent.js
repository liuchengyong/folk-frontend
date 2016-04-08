/**
 * 基础信息
 * Created by HuangGuorui on 3/29/16.
 */
import React from 'react';
import UpImage from './UpImage';
import lodashArray from 'lodash/array';
import Select from 'react-select';
import classNames from 'classnames';
require('react-select/scss/default.scss');

const workYear = [
  { value: 'InSchool', label: '在读'},
  { value: 'YEAR_0_3', label: '3年以下'},
  { value: 'YEAR_3_5', label: '3-5年'},
  { value: 'YEAR_5_10', label: '5-10年'},
  { value: 'YEAR_ABOVE_10', label: '10年以上'}
];

const UpPhotoData = {
  'title': '个人写真',
  'tips': '上传个人清晰写真照片,将用于你的介绍信息中.',
  'header': '上传个人写真'
}
const UpBgData = {
  'title': '个性背景',
  'tips': '上传属于你的个性背景,将用于你的介绍页面.',
  'header': '上传个性背景'
}

class ApplyExpertBaseContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        files: [],
        preItem: [], //有效证件
        avatarPreItem: [], //头像信息,

        currentTime: 0,

        token: this.props.token.token,
        prefix: 'YOUR_QINIU_KEY_PREFIX' // Optional
    };
    this.idImgUrl = [];
    this.bool = false;
  }

  deleteImg(i) {
    this.bool = true;
    this.setState({
      preItem: lodashArray.without(this.state.preItem, this.state.preItem[i])
    });
    this.idImgUrl.splice(i, 1);
  }

  selectTime(i) {
    this.setState({
      currentTime: i
    })
  }

  render() {
    // var replyTimeClass = classNames({
    //   'btn': 'btn',
    //   'reply-btn': 'reply-btn'
    // })
    return (
      <div className="base-content">
        <div className="base-header">
          <div className="base-min-tips">
            <i></i>
            为了能更好的分享,请填写你的真实信息
          </div>
        </div>
        <div className="main">
          <UpImage token={this.props.token.token} className="per-pic" desc={UpPhotoData}/>

          <div className="frm-control-group">
            <div className="workYear-frm">
              <label  className="frm-label frm-wrap">工作年限</label>
              <span className="frm-ipt-box workYear-box">
                            <Select
                name="form-field-name"
                className="edu-school"
                placeholder="工作年限"
                options={workYear}
                />
              </span>
            </div>

            <div className="vcode-frm frm-wrap">
              <label  className="frm-label">所在城市</label>
              <span className="frm-ipt-box vcode">
                <input type="text" className="frm-ipt " name="vcode" placeholder="输入所在城市" />
              </span>
              <span className="vcode-tips frm-tips">请填写你所在城市</span>
            </div>

            <div className="pwd-frm frm-wrap">
              <label  className="frm-label">活动区域</label>
              <span className="frm-ipt-box vcode">
                <input type="text" className="frm-ipt " name="vcode" placeholder="输入常活动区域" />
              </span>
              <span className="pwd-tips frm-tips">请输入常活动区域,方便约见点友</span>

            </div>

            <div className="reply-frm frm-wrap">
              <label  className="frm-label">回应时间</label>
              <span className="frm-ipt-box reply-box spec-box">
                <input type="button" className={'btn reply-btn ' + (this.state.currentTime == 1 ? 'active' : '')} onClick={this.selectTime.bind(this, 1)} name="reply" data-key="6" value="6小时" />
                <input type="button" className={'btn reply-btn ' + (this.state.currentTime == 2 ? 'active' : '')} onClick={this.selectTime.bind(this, 2)} name="reply" data-key="12" value="12小时" />
                <input type="button" className={'btn reply-btn ' + (this.state.currentTime == 3 ? 'active' : '')} onClick={this.selectTime.bind(this, 3)} name="reply" data-key="24" value="1天内" />
                <input type="button" className={'btn reply-btn ' + (this.state.currentTime == 4 ? 'active' : '')} onClick={this.selectTime.bind(this, 4)} name="reply" data-key="48" value="2天内" />
              </span>
            </div>
            <div className="desc-frm frm-wrap">
              <label  className="frm-label">个人介绍</label>
              <span className="frm-ipt-box desc-box spec-box">
              	<textarea className="text-desc" rows="5" placeholder="请详情描述你自己,这将成为审核和预约你的依据,不少于50字" ></textarea>
              </span>
            </div>
            <UpImage token={this.props.token.token} desc={UpBgData}/>

          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // DeviceAdapter.setFrontSize();
    // this.props.actions.fetchExpertData(this.props.params.id);
  }
}


export default ApplyExpertBaseContent;