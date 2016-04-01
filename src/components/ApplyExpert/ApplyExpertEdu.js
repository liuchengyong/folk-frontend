/**
 * 教育信息
 * Created by HuangGuorui on 3/31/16.
 */
import React from 'react';
import Select from 'react-select';
import Qiniu from 'react-qiniu';
require('react-select/scss/default.scss');

const eduLevel = [
  { value: 'UNDERGRADUATE', label: '本科'} ,
  { value: 'MASTER', label: '硕士'},
  { value: 'PHD', label: '博士'},
  { value: 'DOCTOR', label: '博士后'},
];
const eduSchool = [
  { value: 'UNDERGRADUATE', label: '清华'} ,
  { value: 'MASTER', label: '牛津'},
  { value: 'PHD', label: '哈佛'},
  { value: 'DOCTOR', label: '斯坦福'},
];

class ApplyExpertEdu extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        files: [],
        token: 'OSdX1ifRSsfMYxJGQPH95BkPPAIRI2sSKWfQ-153:OHQNSNmwhYRaFEMLBG0QklTgIPg=:eyJzY29wZSI6Imx1b3RlbmciLCJkZWFkbGluZSI6MTQ1OTQ4MTU4NH0=',
        prefix: 'YOUR_QINIU_KEY_PREFIX' // Optional
    };

  }

    onUpload(files) {
        // set onprogress function before uploading
        files.map(function (f) {
            f.onprogress = function(e) {
                console.log(e.percent);
                };
        });
    } 

    onDrop(files) {
        this.setState({
            files: files
        });
        // files is a FileList(https://developer.mozilla.org/en/docs/Web/API/FileList) Object
        // and with each file, we attached two functions to handle upload progress and result
        // file.request => return super-agent uploading file request
        // file.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
        // `react-qiniu` using bluebird, check bluebird API https://github.com/petkaantonov/bluebird/blob/master/API.md
        // see more example in example/app.js
      console.log('Received files: ', files);
      files.map(file => {
        file.uploadPromise.then((data) => {
        });
      });
    }

    showFiles () {
        if (this.state.files.length <= 0) {
            return '';
        }

        var files = this.state.files;
        var progresses = this.state.progresses;
        let styles = {
            width: '600px',
            margin: '10px auto'
        }

        return (
           <div className='dropped-files' style={styles}>
            <ul>
            {[].map.call(files, function (f, i) {
                // f is a element of files
                // f.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
                // f.request => return super-agent request with uploading file
                var preview = '';
                var progress = progresses && progresses[f.preview]
                if (/image/.test(f.type)) {
                    preview = <img src={f.preview} />;
                } else if (/audio/.test(f.type)) {
                    preview = <audio src={f.preview} controls preload> </audio>;
                }
                return <li key={i}>{preview} </li>;
            })}
            </ul>
            </div>
        );
    }


  handleSelectEduLevel(value) {
    console.log(value);
  }
  render() {

    return (
       <div className="edu-wrap">
        <div className="edu-header">
          教育信息
        </div>
        <div className="edu-content">

          <div className="level-frm frm-wrap">
            <label  className="frm-label">学历</label>
            <span className="frm-ipt-box edu-level">
              <Select
                name="form-field-name"
                className="edu-school"
                placeholder="选择学历"
                options={eduLevel}
                onChange={this.handleSelectEduLevel.bind(this)}
              />
            </span>
          </div> 

          <div className="school-frm frm-wrap">
            <label  className="frm-label">学校</label>
            <span className="frm-ipt-box school-list">
              <Select
                name="form-field-name"
                className="edu-school"
                placeholder="选择学校,可直接输入学校名字搜索"
                options={eduSchool}
                onChange={this.handleSelectEduLevel.bind(this)}
              />
            </span>
          </div>         

          <div className="major-frm frm-wrap">
            <label  className="frm-label">专业</label>
            <span className="frm-ipt-box major">
              <input type="text" className="frm-ipt " name="major" palceholder="请输入你的手机号" />
            </span>
            <span className="major-tips frm-tips">请填写手机短信收到的6位数字验证码</span>
          </div>

          <div className="entry-time-frm frm-wrap">
            <label  className="frm-label">入学时间</label>
            <span className="frm-ipt-box entry-time">
              <Select
                name="form-field-name"
                className="edu-school"
                placeholder="选择入学时间"
                options={eduSchool}
                onChange={this.handleSelectEduLevel.bind(this)}
              />
            </span>
          </div>

          <Qiniu multiple={false} onDrop={this.onDrop.bind(this)} size={150} token={this.state.token} onUpload={this.onUpload}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Qiniu>
          {this.showFiles()}
        </div>
      </div>
    );
  }
}

export default ApplyExpertEdu;