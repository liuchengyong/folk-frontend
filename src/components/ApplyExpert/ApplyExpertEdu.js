/**
 * 教育信息
 * Created by HuangGuorui on 3/31/16.
 */
import React from 'react';
import Select from 'react-select';
require('react-select/scss/default.scss');

const eduLevel = [
  { value: 'UNDERGRADUATE', label: '本科'},
  { value: 'MASTER', label: '硕士'},
  { value: 'PHD', label: '博士'},
  { value: 'DOCTOR', label: '博士后'}
];
const eduSchool = [
  { value: 'UNDERGRADUATE', label: '清华'} ,
  { value: 'MASTER', label: '牛津'},
  { value: 'PHD', label: '哈佛'},
  { value: 'DOCTOR', label: '斯坦福'}
];

class ApplyExpertEdu extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSelectEduLevel() {
    // console.log(value);
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
              <input type="text" className="frm-ipt " name="major" placeholder="请输入你的专业" />
            </span>
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

        </div>
      </div>
    );
  }
}

export default ApplyExpertEdu;