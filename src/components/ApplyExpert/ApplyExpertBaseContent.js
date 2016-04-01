/**
 * 基础信息
 * Created by HuangGuorui on 3/29/16.
 */
import React from 'react';
import ApplyExpertEdu from './ApplyExpertEdu';
import Qiniu from 'react-qiniu';


class ApplyExpertBaseContent extends React.Component {

  constructor(props) {
    super(props);
    // http://test.zhid58.com:8080/api/v1/upload/token
    this.state = {
        files: [], 
        token: this.props.token.token,
        prefix: 'YOUR_QINIU_KEY_PREFIX' // Optional
    };
    this.preItem = [];

  }

    onUpload(files) {
        // set onprogress function before uploading
        files.map(function (f) {
            f.onprogress = function(e) {
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
          console.log(JSON.parse(data.text));
        });
      });
      // this.showFiles();
      console.log(this.preItem);
    }

    showFiles () {
      if (this.state.files.length <= 0) {
        return '';
      }
      if(this.preItem.length >= 3) {
        console.log('最多上传三张图片');
        return false;
      }

      var files = this.state.files;
      
      this.preItem.push([].map.call(files, function (f, i) {
          // f is a element of files
          // f.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
          // f.request => return super-agent request with uploading file
          var preview = '';
          if (/image/.test(f.type)) {
              preview = <div className="pre-view">
                          <img src={f.preview} />
                        </div>;
          }
          return <li ref="perviewItem" className="perview-item" key={i}>{preview} </li>;
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
          <div className="frm-control-group">
            <div className="name-frm">
              <label  className="frm-label frm-wrap">姓名</label>
              <span className="frm-ipt-box">
                <input type="text" className="frm-ipt name" name="name" palceholder="请填写你的真实姓名" />
              </span>
            </div>
            <div className="phone-frm frm-wrap">
              <label  className="frm-label">手机号</label>
              <span className="frm-ipt-box mobile">
                <input type="text" className="frm-ipt mobile" name="mobile" palceholder="请输入你的手机号" />
              </span>
              <a href="javascript:;" id="sendCode" className="btn btn-vcode">发送验证码</a>
            </div>

            <div className="vcode-frm frm-wrap">
              <label  className="frm-label">验证码</label>
              <span className="frm-ipt-box vcode">
                <input type="text" className="frm-ipt " name="vcode" palceholder="请输入你的手机号" />
              </span>
              <span className="vcode-tips frm-tips">请填写手机短信收到的6位数字验证码</span>
            </div>

            <div className="pwd-frm frm-wrap">
              <label  className="frm-label">密码</label>
              <span className="frm-ipt-box vcode">
                <input type="password" className="frm-ipt " name="vcode" palceholder="请输入你的手机号" />
              </span>
              <span className="pwd-tips frm-tips">字母、数字或者英文符号，最短6位，区分大小写</span>

            </div>

            <div className="gender-frm frm-wrap">
              <label  className="frm-label">性别</label>
              <span className="frm-ipt-box gender">

                <input type="button" className="btn male-btn" name="male" value="男" />
                <input type="button" className="btn female-btn" name="female" value="女" />
              </span>
            </div>

            <div className="form-group frm-wrap avatar-frm">
              <label  className="frm-label ">个人头像</label>
              <div className="frm-ipt-box avatar-up">
                <div className="upload-pic-wrapper">
                  <div className="upload-pic-title">
                    上传个人照片
                  </div>

                  <div className="upload-pic-content" id="container">
                    <div className="ipt-upload-pic">
                      <input type="file" className="form-control" id="expertPic" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="role-frm frm-wrap">
              <span className="frm-tips role-tips"><i></i>为了更有针对性的为你推荐,请选择你的身份,进行下一步操作</span>
              <label  className="frm-label">选择身份</label>
              <span className="frm-ipt-box role-group">
                <li className="role-item">
                  <img src="../../images/icon/student_ico.png" alt="我是学生" />
                  <span>我是学生</span>
                </li>
                <li className="role-item">
                  <img src="../../images/icon/parent_ico.png" alt="我是家长" />
                  <span>我是家长</span>
                </li>
                <li className="role-item">
                  <img src="../../images/icon/teacher_ico.png" alt="我是老师" />
                  <span>我是老师</span>
                </li>
              </span>
            </div>

            <div className="form-group frm-wrap id-frm">
              <span className="frm-tips id-tips"><i></i>为了证明身份的正确性,我们不得不需要你上传您的证件,可以是身份证,学生证等有效证件。
              我们会对您的信息进行安全保密和保护</span>

              <div className="pre-wrap">
                <ul>
                  {this.preItem.map((img, i) => {
                    return img;
                  })}
                </ul>
              </div>
              <label  className="frm-label">个人身份信息</label>
              <div className="frm-ipt-box id-up">
                <div className="upload-pic-wrapper">
                  <div className="upload-pic-title">
                    上传个人照片
                  </div>

                  <div className="upload-pic-content" id="container">
                    <div className="ipt-upload-pic">
                        <Qiniu multiple={false} className="form-control" id="expertPic" onDrop={this.onDrop.bind(this)} size={150} token={this.state.token} onUpload={this.onUpload}>
                        </Qiniu>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           <ApplyExpertEdu />

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