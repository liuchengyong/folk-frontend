/**
 * 基础信息
 * Created by HuangGuorui on 3/29/16.
 */
import React from 'react';
import ApplyExpertEdu from './ApplyExpertEdu';
import ExpertUpAvatar from './ExpertUpAvatar';
import lodashArray from 'lodash/array';
import Select from 'react-select';
import Qiniu from 'react-qiniu';
require('react-select/scss/default.scss');

const workYear = [
  { value: 'InSchool', label: '在读'},
  { value: 'YEAR_0_3', label: '3年以下'},
  { value: 'YEAR_3_5', label: '3-5年'},
  { value: 'YEAR_5_10', label: '5-10年'},
  { value: 'YEAR_ABOVE_10', label: '10年以上'},
];
const eduSchool = [
  { value: 'UNDERGRADUATE', label: '清华'} ,
  { value: 'MASTER', label: '牛津'},
  { value: 'PHD', label: '哈佛'},
  { value: 'DOCTOR', label: '斯坦福'}
];


class ApplyExpertBaseContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        files: [],
        preItem: [], //有效证件
        avatarPreItem: [], //头像信息
        token: this.props.token.token,
        prefix: 'YOUR_QINIU_KEY_PREFIX' // Optional
    };
    this.idImgUrl = [];
    this.bool = false;
  }

  onUpload(files) {
    files.map(function (f) {
        f.onprogress = function() {
        };
    });
  }
  onDrop(files) {
    this.setState({
        files: files
    });
    files.map(file => {
      file.uploadPromise.then((data) => {
        this.idImgUrl.push(JSON.parse(data.text));
      });
    });
  }

  deleteImg(i) {
    this.bool = true;
    this.setState({
      preItem: lodashArray.without(this.state.preItem, this.state.preItem[i])
    });
    this.idImgUrl.splice(i, 1);
  }

  showFiles () {
    if (this.state.files.length <= 0) {
      return '';
    }

    if(this.state.preItem.length >= 3) {
      // console.log('最多上传三张图片');
      return false;
    }

    var files = this.state.files;
    var self = this;

    if(this.bool) {
      this.bool = false;
      return false;
    }
    this.state.preItem.push([].map.call(files, function (f, i) {
      var i = self.state.preItem.length || i;
        var preview = '';
        if (/image/.test(f.type)) {
            preview = <div className="pre-view">
                        <img  src={f.preview} key={i}/>
                      </div>;
        }
        return <li onClick={self.deleteImg.bind(self, i)}  className="perview-item" key={i}><div className="mask-pre">点击删除</div>{preview} </li>;
    }));
  }

  render() {
    this.showFiles();
    return (
      <div className="base-content">
        <div className="base-header">
          <div className="base-min-tips">
            <i></i>
            为了能更好的分享,请填写你的真实信息
          </div>
        </div>
        <div className="main">
          <ExpertUpAvatar token={this.props.token.token} className="per-pic" />

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
              <label  className="frm-label">性别</label>
              <span className="frm-ipt-box reply-box spec-box">
                <input type="button" className="btn reply-btn" name="reply" data-key="6" value="6小时" />
                <input type="button" className="btn reply-btn" name="reply" data-key="12" value="12小时" />
                <input type="button" className="btn reply-btn" name="reply" data-key="24" value="1天内" />
                <input type="button" className="btn reply-btn" name="reply" data-key="48" value="2天内" />
              </span>
            </div>
            <div className="desc-frm frm-wrap">
              <label  className="frm-label">个人介绍</label>
              <span className="frm-ipt-box desc-box spec-box">
              	<textarea className="text-desc" rows="5" placeholder="请详情描述你自己,这将成为审核和预约你的依据,不少于50字" ></textarea>
              </span>
            </div>
            <ExpertUpAvatar token={this.props.token.token}/>

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