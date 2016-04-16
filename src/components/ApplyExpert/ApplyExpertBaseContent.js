/**
 * 基础信息
 * Created by HuangGuorui on 3/29/16.
 */
import React from 'react';
import ApplyExpertEdu from './ApplyExpertEdu';
import UpImage from './UpImage';
import lodashArray from 'lodash/array';
import Qiniu from 'react-qiniu';
import config from 'config';
import regexHelper from '../../common/regexHelper';
import classNames from 'classnames';
import Select from 'react-select';
require('react-select/scss/default.scss');
let student_ico = require('../../images/icon/student_ico.png');
let parent_ico = require('../../images/icon/parent_ico.png');
let teacher_ico = require('../../images/icon/teacher_ico.png');

const UpAvatarData = {
  'title': '个人头像',
  'tips': '请上传个人图片',
  'error-tips': '请上传个人图片',
  'header': '上传个人照片'
}

class ApplyExpertBaseContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        files: [],
        preItem: [], //

        idFiles: [], // 

        avatarPreItem: [], //头像信息

        countryCode: config.countryCode[14],

        verifyTips: '请填写正确的中国大陆地区手机号码',

        student: false || (this.props.localData && this.props.localData.role == 'student'),
        parent: false || (this.props.localData && this.props.localData.role == 'parent'),
        teacher: false || (this.props.localData && this.props.localData.role == 'teacher'),

        idUp: false || this.props.localData,
        token: this.props.token.token,
        genderStatus: 'hide',
        avatarStatus: 'hide',

        username: 0, //0:初始, 1:正确, 2:错误
        mobile: 0,
        title: 0,
        captch: 0,
        shortDesc: 0,
        maleActive: false || (this.props.localData && this.props.localData.gener == 'male'),
        femaleActive: false || (this.props.localData && this.props.localData.gener == 'female'),

        bool: false,

        prefix: 'YOUR_QINIU_KEY_PREFIX' // Op
    };
    this.idImgUrl = [];
    this.bool = false;
    console.log(this.props.actions);
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
    this.setState({
      bool : true
    });
    this.setState({
      preItem: lodashArray.without(this.state.preItem, this.state.preItem[i])
    });
    this.idImgUrl.splice(i, 1);
  }

  //选择角色
  selectRole(role) {
    if(role == 'student') {
      this.setState({
        student: true,
        idUp: true,
        parent: false,
        teacher: false
      })
    } else if(role == 'parent') {
      this.setState({
        student: false,
        idUp: true,
        parent: true,
        teacher: false
      })
    } else {
      this.setState({
        student: false,
        idUp: true,
        parent: false,
        teacher: true
      })
    }
  }
  //@TODO 工厂模式优化, easy-ui
  handleChange(event) {
    var type = event.target.name;
    var value = event.target.value;
    switch (type) {
      case 'name':
        if(regexHelper.username(value)) {
          this.setState({
            username: 1
          })
        } else {
          this.setState({
            username: 2
          })
        }
        break;
      case 'mobile':
        if(regexHelper.mobile(value)) {
          var verifyCode = this.props.actions.verifyExpert(value);
          var self = this;
          var timer = setInterval(function() {
            if(self.props.verifyExpert.isFetching) {
              console.log('验证中');
            } else {
              console.log('验证完毕')
              var verifyCode = self.props.verifyExpert;
              console.log(verifyCode);
              if(verifyCode.code == 0) {
                self.setState({
                  mobile: 2,
                  verifyTips: '该手机号已经是点师,请直接登录'
                })
              } else if(verifyCode.code == 606){
                self.setState({
                  mobile: 2,
                  verifyTips: '该手机号已经在申请中,请耐心等待'
                })
              } else {
                self.setState({
                  mobile: 1,
                  verifyTips: '手机号可用'
                })
              }
              clearInterval(timer);
            }

          }, 200)
          
        } else {

          this.setState({
            mobile: 2,
            verifyTips: '请填写正确的中国大陆地区手机号码'
          })
        }
        break;
      case 'vcode':
        if(regexHelper.captch(value)) {
          this.setState({
            captch: 1
          })
        } else {
          this.setState({
            captch: 2
          })
        }
        break;
      case 'password':
        regexHelper.password(value);
        break;
      case 'shortDesc':
        if(regexHelper.shortDesc(value)) {
          this.setState({
            shortDesc: 1
            })
          } else {
            this.setState({
              shortDesc: 2
            })
        }
        break;
      case 'title':
        if(regexHelper.title(value)) {
            this.setState({
              title: 1
              })
          } else {
            this.setState({
              title: 2
            })
          }

      default:
        break;
    }
  }
  //选择性别
  selectgender(event) {
    var value = event.target.name;
    this.setState({
      genderStatus: 'hide'
    })
    if(value == 'male') {
      this.setState({
        femaleActive: false,
        maleActive: true
      })
    } else {
      this.setState({
        maleActive: false,
        femaleActive: true
      })
    }
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
    if(this.state.bool) {
      this.setState({
        bool : false
      });
      return false;
    }  else {
      this.setState({
        key: false
      })
    }
    this.state.preItem.push([].map.call(files, function (f, i) {
      var i = self.state.preItem.length || i;
      self.state.idFiles.push(f);
      var preview = '';
      if (/image/.test(f.type)) {
          preview = <div className="pre-view">
                      <img  src={f.preview} key={i}/>
                    </div>;
      }
      return <li onClick={self.deleteImg.bind(self, i)} className="perview-item" key={i}><div className="mask-pre">点击删除</div>{preview} </li>;
    }));

    if(!this.state.bool) {
      this.state.files = [];
    }
  }
  handleCountryChange(value) {
    console.log(value);
    var key = value.split(',');
    console.log(key);
    var code = key[0];
    this.setState({
      countryCode: key[3]
    })
    console.log('---------------');
  }

  componentDidUpdate() {
    this.showFiles();
  }
  render() {
    //TODO 优化,复用
    var userNameClass = classNames({
      'ipt-tips': 'ipt-tips',
      'username': 'username',
      'error': (this.state.username == 2),
      'right': (this.state.username == 1),
      'hide': (this.state.username == 0)
    });
    var titleClass = classNames({
      'ipt-tips': 'ipt-tips',
      'title': 'title',
      'error': (this.state.title == 2),
      'right': (this.state.title == 1),
      'hide': (this.state.title == 0)
    });

    var shortDescClass = classNames({
      'ipt-tips': 'ipt-tips',
      'shortDesc': 'shortDesc',
      'error': (this.state.shortDesc == 2),
      'right': (this.state.shortDesc == 1),
      'hide': (this.state.shortDesc == 0)
    })

    var mobileClass = classNames({
      'ipt-tips': 'ipt-tips',
      'mobile': 'mobile',
      'error': (this.state.mobile == 2),
      'right': (this.state.mobile == 1),
      'hide': (this.state.mobile == 0)
    });
    var vcodeClass = classNames({
      'ipt-tips': 'ipt-tips',
      'captch': 'captch',
      'error': (this.state.captch == 2),
      'right': (this.state.captch == 1),
      'hide': (this.state.captch == 0)
    });
    var maleClass = classNames({
      'btn': 'btn',
      'male-btn': 'male-btn',
      'active': this.state.maleActive || (this.props.localData && this.props.localData.gener == 'male')
    });
    var femaleClass = classNames({
      'btn': 'btn',
      'female-btn': 'female-btn',
      'active': this.state.femaleActive || (this.props.localData && (this.props.localData.gener == 'female'))
    });
    
    var studentClass = classNames({
      'role-item': 'role-item',
      'active': this.state.student
    });
    var parentClass = classNames({
      'role-item': 'role-item',
      'active': this.state.parent
    });
    var teacherClass = classNames({
      'role-item': 'role-item',
      'active': this.state.teacher
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
          <div className="frm-control-group">
            <div className="name-frm">
              <label  className="frm-label frm-wrap">姓名</label>
              <span className="frm-ipt-box">
                <input type="text" className="frm-ipt name" name="name"
                  onChange={this.handleChange.bind(this)}
                  value={this.props.localData && this.props.localData.name}
                  ref="userName"
                  placeholder="请填写你的真实姓名"
                />

              </span>
              <span className={userNameClass}><i></i><span>至少为两位且不含有特殊字符</span></span>
            </div>


            <div className="phone-frm frm-wrap">
              <label  className="frm-label">手机号</label>
                <Select
                  name="form-field-name"
                  className="country-code"
                  placeholder="选择国家"
                  options={config.countryCode}
                  value={this.state.countryCode}
                  onChange={this.handleCountryChange.bind(this)}
                />
              <span className="frm-ipt-box mobile">
 

                <input type="text" className="frm-ipt mobile"
                  ref="mobile" name="mobile"
                  onChange={this.handleChange.bind(this)}
                  placeholder="请输入你的手机号"
                  value={this.props.localData && this.props.localData.mobile}
                />
              </span>
              <a href="javascript:;" id="sendCode" className="btn btn-vcode hide">发送验证码</a>
              <span className={mobileClass}><i></i><span>{this.state.verifyTips}</span></span>
              <span className="vcode-tips frm-tips">注册成功后会收到一个默认密码,同时可用于找回密码</span>

            </div>

            <div className="vcode-frm hide frm-wrap">
              <label  className="frm-label" >验证码</label>
              <span className="frm-ipt-box vcode">
                <input type="text" className="frm-ipt" onChange={this.handleChange.bind(this)}  name="vcode" placeholder="请输入你的手机号" />
              </span>
              <span className={vcodeClass}><i></i><span>请确认验证码为六位数字</span></span>
              <span className="vcode-tips frm-tips">请填写手机短信收到的6位数字验证码</span>

            </div>

            <div className="pwd-frm frm-wrap hide">
              <label  className="frm-label">密码</label>
              <span className="frm-ipt-box vcode">
                <input type="password" className="frm-ipt" ref="password" name="password" onChange={this.handleChange.bind(this)} placeholder="请输入你的手机号" />
              </span>
              <span className="pwd-tips frm-tips">字母、数字或者英文符号，最短6位，区分大小写</span>

            </div>

            <div className="gender-frm frm-wrap">
              <label  className="frm-label">性别</label>
              <span className="frm-ipt-box gender">
                <input type="button" className={maleClass} onClick={this.selectgender.bind(this)} name="male" value="男" />
                <input type="button" className={femaleClass} onClick={this.selectgender.bind(this)} name="female" value="女" />
                <span className={'ipt-tips error ' + this.state.genderStatus}><i></i><span>请选择性别</span></span>
              </span>
            </div>

            <div className="shortDesc-frm">
              <label  className="frm-label frm-wrap">签名</label>
              <span className="frm-ipt-box">
                <input type="text" className="frm-ipt shortDesc" name="shortDesc" 
                  onChange={this.handleChange.bind(this)} 
                  value={this.props.localData && this.props.localData.shortDesc} 
                  ref="shortDesc" 
                  placeholder="一句话简短介绍自己" 
                />

              </span>
              <span className={shortDescClass}><i></i><span>最多21个字且不含有特殊字符</span></span>
              <span className="vcode-tips frm-tips">用精简的话来介绍一下自己,不超过21字</span>
            </div>

            <UpImage token={this.props.token.token} imgData={this.props.localData && this.props.localData} ref="upImage" showTips={this.props.showTips} desc={UpAvatarData} />

            <div className="role-frm frm-wrap">
              <span className="frm-tips role-tips"><i></i>为了更有针对性的为你推荐,请选择你的身份,进行下一步操作</span>
              <label  className="frm-label">选择身份</label>
              <span className="frm-ipt-box role-group">
                <li className={studentClass} onClick={this.selectRole.bind(this, 'student')}>
                  <img src={student_ico} alt="我是学生" />
                  <span>我是学生</span>
                </li>
                <li className={parentClass} onClick={this.selectRole.bind(this, 'parent')}>
                  <img src={parent_ico} alt="我是家长" />
                  <span>我是家长</span>
                </li>
                <li className={teacherClass} onClick={this.selectRole.bind(this, 'teacher')}>
                  <img src={teacher_ico} alt="我是老师" />
                  <span>我是老师</span>
                </li>
              </span>
              <span className={'ipt-tips error ' + (this.props.roleTips ? '' : 'hide')} ><i></i>选择你的角色</span>
            </div>
            { this.state.idUp &&
              <div className="form-group frm-wrap id-frm">
                <span className="frm-tips id-tips"><i></i>为了证明身份的正确性,我们不得不需要你上传您的证件,可以是身份证,学生证等有效证件。
                我们会对您的信息进行安全保密和保护</span>

                <div className="pre-wrap">
                  <ul>
                    {this.state.preItem.map((img) => {
                      return img;
                    })}
                  </ul>
                </div>
                <label className="frm-label">个人身份信息</label>
                <div className="frm-ipt-box id-up">
                  <div className="upload-pic-wrapper">
                    <div className="upload-pic-title">
                      上传有效证件(最多三张)
                    </div>
                    <div className="upload-pic-content" id="container">
                      <div className="ipt-upload-pic">
                          <Qiniu multiple={false} className="form-control" id="expertPic" onDrop={this.onDrop.bind(this)} size={150} token={this.state.token} onUpload={this.onUpload.bind(this)}>
                          </Qiniu>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            }
            {
              (this.state.parent || this.state.teacher) &&
              <div className="title-frm">
                <label  className="frm-label frm-wrap">职位</label>
                <span className="frm-ipt-box">
                  <input type="text" className="frm-ipt shortDesc" name="title"
                    onChange={this.handleChange.bind(this)}
                    value={this.props.localData && this.props.localData.title}
                    ref="title"
                    placeholder="填写自己现在的职位性质"
                  />
                </span>
                <span className={titleClass}><i></i><span>职位描述至少两个字,最多21字</span></span>
                <span className="vcode-tips frm-tips">例如:指点研发工程师</span>
             </div>

            }
            {this.state.student &&
              <ApplyExpertEdu ref="studentInfo" actions={this.props.actions} collegeByCountry={this.props.collegeByCountry}/>
            }

          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.showFiles();
    // DeviceAdapter.setFrontSize();
    // this.props.actions.fetchExpertData(this.props.params.id);
  }
}


export default ApplyExpertBaseContent;