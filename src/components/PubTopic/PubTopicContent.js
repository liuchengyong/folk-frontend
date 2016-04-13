/**
 * 基础信息
 * Created by HuangGuorui on 3/29/16.
 */
import React from 'react';
import classNames from 'classnames';
require('react-select/scss/default.scss');

class PubTopicContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        descLength: 0,
        Online: false,
        Offline: false,
        currentTime: 0
    };
    this.bool = false;
  }

  selectTime(i) {
    this.setState({
      currentTime: i
    })
  }

  handleChangeDesc(event) {
    var value = event.target.value;
    if(this.refs.topicDesc.value.length <= 50) {
      this.setState({
        descLength: value.length
      })
    } else {
      // this.setState({
      //   hide: value.length
      // })
    }
  }
    //选择交流方式
  selectMethod(event) {
    var value = event.target.name;
    if(value == 'online') {
      this.setState({
        Offline: false,
        Online: true
      })
    } else {
      this.setState({
        Online: false,
        Offline: true
      })
    }
  }

  render() {

    var onlineClass = classNames({
      'btn': 'btn',
      'male-btn': 'male-btn',
      'active': this.state.Online
    });
    var offlineClass = classNames({
      'btn': 'btn',
      'female-btn': 'female-btn',
      'active': this.state.Offline
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

            <div className="vcode-frm frm-wrap">
              <label  className="frm-label">话题名称</label>
              <span className="frm-ipt-box vcode">
                <input type="text" className="frm-ipt " ref="topicName" name="vcode" placeholder="请输入话题名称" />
              </span>
              <span className="vcode-tips frm-tips"> 一个合适的话题名称可以让你得到更多的推荐</span>
            </div>

            <div className="desc-frm frm-wrap">
              <label  className="frm-label">话题描述</label>
              <span className="frm-ipt-box desc-box spec-box">
                <textarea className="text-desc" rows="5" ref="topicDesc" onChange={this.handleChangeDesc.bind(this)} placeholder="请详情描述你的话题,这将成为审核和点友预约你的依据,不少于50字" ></textarea>
              </span>
              <span className={this.state.descLength >= 50 ? 'hide' : ''} > 还需输入{50 - this.state.descLength}字</span>

            </div>

            <div className="pwd-frm frm-wrap">
              <label  className="frm-label">话题价格</label>
              <span className="frm-ipt-box price">
                <input type="text" className="frm-ipt " ref="price" name="price" placeholder="" />
              </span>
              元
              <span className="pwd-tips frm-tips">请输入0-5000的价格,合适的价格会让提高你的预约成功率</span>

            </div>

            <div className="reply-frm frm-wrap">
              <label  className="frm-label">话题时长</label>
              <span className="frm-ipt-box reply-box spec-box">
                <input type="button" className={'btn reply-btn ' + (this.state.currentTime == 1 ? 'active' : '')} onClick={this.selectTime.bind(this, 1)} name="reply" data-key="30" value="30分钟" />
                <input type="button" className={'btn reply-btn ' + (this.state.currentTime == 2 ? 'active' : '')} onClick={this.selectTime.bind(this, 2)} name="reply" data-key="45" value="45分钟" />
                <input type="button" className={'btn reply-btn ' + (this.state.currentTime == 3 ? 'active' : '')} onClick={this.selectTime.bind(this, 3)} name="reply" data-key="60" value="60分钟" />
                <input type="button" className={'btn reply-btn ' + (this.state.currentTime == 4 ? 'active' : '')} onClick={this.selectTime.bind(this, 4)} name="reply" data-key="90" value="90分钟" />
              </span>
            </div>

            <div className="gender-frm frm-wrap">
              <label  className="frm-label">交流方式</label>
              <span className="frm-ipt-box gender">
                <input type="button" className={onlineClass} onClick={this.selectMethod.bind(this)} name="online" value="屏对屏" />
                <input type="button" className={offlineClass} onClick={this.selectMethod.bind(this)} name="offline" value="面对面" />
              </span>
            </div>

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


export default PubTopicContent;