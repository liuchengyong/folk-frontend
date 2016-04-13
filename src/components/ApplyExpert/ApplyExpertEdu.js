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
const countryList = [
  { value: 'CHINA', label: '中国'} ,
  { value: 'TW', label: '中国台湾'},
  { value: 'HK', label: '中国香港'},
  { value: 'MO', label: '中国澳门'},
  { value: 'US', label: '美国'},
  { value: 'GB', label: '英国'},
  { value: 'JP', label: '日本'},
  { value: 'KR', label: '韩国'},
  { value: 'GE', label: '德国'},
  { value: 'FR', label: '法国'},
  { value: 'AU', label: '澳大利亚'},
  { value: 'RU', label: '俄罗斯'},
  { value: 'CA', label: '加拿大'},
  { value: 'SG', label: '新加坡'}
];

class ApplyExpertEdu extends React.Component {

  constructor(props) {
    super(props);
    this.eduInfo = {};
    this.state = {
      schoolList: []
    }
  }

  handleSelectEduLevel(type, value) {
    this.eduInfo[type] = value;

    if(type == 'country') {
      var self = this;
      this.props.actions.fetchCollegeCountry(value).then(
        () => {

          this.setState({
            schoolList: self.props.collegeByCountry
          });
        })
    }
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
                value={this.eduInfo.level}
                onChange={this.handleSelectEduLevel.bind(this, 'level')}
              />
            </span>
          </div>

          <div className="school-frm frm-wrap">
            <label  className="frm-label">学校</label>
            <span className="frm-ipt-box country-list">
              <Select
                name="form-field-name"
                className="edu-school"
                placeholder="选择国家"
                options={countryList}
                value={this.eduInfo.country}
                onChange={this.handleSelectEduLevel.bind(this, 'country')}
              />
            </span>
            <span className="frm-ipt-box school-list">
              <Select
                name="form-field-name"
                className="edu-school"
                placeholder="选择学校,选择学校所在国家"
                options={this.state.schoolList}
                value={this.eduInfo.school}
                onChange={this.handleSelectEduLevel.bind(this, 'school')}
              />
            </span>
          </div>

          <div className="major-frm frm-wrap">
            <label  className="frm-label">专业</label>
            <span className="frm-ipt-box major">
              <input type="text" className="frm-ipt " ref="major" name="major" placeholder="请输入你的专业" />
            </span>
          </div>

          <div className="entry-time-frm frm-wrap">
            <label  className="frm-label">入学时间</label>
            <span className="frm-ipt-box entry-time">
              <Select
                name="form-field-name"
                className="edu-school"
                placeholder="选择入学时间"
                options={countryList}
                value={this.eduInfo.entry}
                onChange={this.handleSelectEduLevel.bind(this, 'entry')}
              />
            </span>
          </div>

        </div>
      </div>
    );
  }
}

export default ApplyExpertEdu;