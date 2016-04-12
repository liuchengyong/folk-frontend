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

const WorkYear = [
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
        workYear: '',

        city: 0,
        area: 0,
        descLength: 0,

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

  handleChangeDesc(event) {
    var value = event.target.value;
    if(this.refs.description.value.length <= 50) {
      this.setState({
        descLength: value.length
      })
    } else {
      // this.setState({
      //   hide: value.length
      // })
    }
  }

  handleWorkChange(val) {
    this.state.workYear = val;
  }
  handleChange(event) {
    var type = event.target.name;
    var value = event.target.value;
    switch (type) {
      case 'city':
        if(value.length < 2) {
          this.setState({
            city: 2
          })
        } else {
          this.setState({
            city: 1
          })
        }
        break;
      case 'area':
        if(value.length < 2) {
          this.setState({
            area: 2
          })
        } else {
          this.setState({
            area: 1
          })
        }
        break;
    }

  }

  render() {

    var cityClass = classNames({
      'ipt-tips': 'ipt-tips',
      'username': 'username',
      'error': (this.state.city == 2),
      'right': (this.state.city == 1),
      'hide': (this.state.city == 0)
    });

    var areaClass = classNames({
      'ipt-tips': 'ipt-tips',
      'username': 'username',
      'error': (this.state.area == 2),
      'right': (this.state.area == 1),
      'hide': (this.state.area == 0)
    });

    return (
      <div className="base-content">
        <div className="base-header">
          <div className="base-min-tips">
            <i></i>
            为了能更好的分享,请填写你的真实信息
          </div>
        </div>
        <div className="main">
          <UpImage token={this.props.token.token} className="per-pic" ref="perPhoto" desc={UpPhotoData}/>

          <div className="frm-control-group">
            <div className="workYear-frm">
              <label  className="frm-label frm-wrap">工作年限</label>
              <span className="frm-ipt-box workYear-box">
                <Select
                  name="form-field-name"
                  className="edu-school"
                  placeholder="工作年限"
                  value={this.state.workYear}
                  options={WorkYear}
                  onChange={this.handleWorkChange.bind(this)}
                />
              </span>
            </div>

            <div className="vcode-frm frm-wrap">
              <label  className="frm-label">所在城市</label>
              <span className="frm-ipt-box vcode">
                <input type="text" className="frm-ipt " name="city" ref="activeCity" onChange={this.handleChange.bind(this)} placeholder="输入所在城市" />
              </span>
              <span className={cityClass}><i></i><span>至少为两位且不含有特殊字符</span></span>
              <span className="vcode-tips frm-tips">请填写你所在城市</span>

            </div>

            <div className="pwd-frm frm-wrap">
              <label  className="frm-label">活动区域</label>
              <span className="frm-ipt-box vcode">
                <input type="text" className="frm-ipt " name="area" ref="activeArea" onChange={this.handleChange.bind(this)} placeholder="输入常活动区域" />
              </span>
              <span className={areaClass}><i></i><span>至少为两位且不含有特殊字符</span></span>
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
              	<textarea className="text-desc" rows="5" ref="description" name="desc" onChange={this.handleChangeDesc.bind(this)} placeholder="请详情描述你自己,这将成为审核和预约你的依据,不少于50字" ></textarea>
                
              </span>
                <span className={this.state.descLength >= 50 ? 'hide' : ''} > 还需输入{50 - this.state.descLength}字</span>
            </div>
            <UpImage token={this.props.token.token} desc={UpBgData} ref="expertBg"/>

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