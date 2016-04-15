/**
 * 基础信息
 * Created by HuangGuorui on 3/29/16.
 */
import React from 'react';
import regexHelper from '../../common/regexHelper';
import classNames from 'classnames';
require('react-select/scss/default.scss');

class PubTopicContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        descLength: 0,
        titleLength: 0,
        Online: false,
        Offline: false,

        topicTitle: 0,
        price: 0,
        descToggle: 0, 

        currentTime: 0
    };
    this.bool = false;
    this.topicLengthTips = '';
  }

  selectTime(i) {
    this.setState({
      currentTime: i
    })
  }

  handleChangeTitle(event) {
    var value = event.target.value;
    if(value.length < 35) {
      // value.lengtht
      this.setState({
        topicTitle: 2,
        topicLength: value.length
      })
      this.topicLengthTips = ',还差' + (35 - value.length) + '字';
    } else {
      this.setState({
        topicTitle: 1,
      })
      this.topicLengthTips = '';
    }
  }

  handleChangeDesc(event) {
    var value = event.target.value;
    if(this.refs.topicDesc.value.length < 50) {
      this.setState({
        descLength: value.length,
        descToggle: 2
      })
    } else {
      this.setState({
        descLength: value.length,
        descToggle: 1
      })
    }
  }
  handleChangePrice(event) {
    var value = event.target.value;
    if(!regexHelper.numberZero(value)) {
      this.setState({
        price: 2
      })
    } else {
      this.setState({
        price: 1
      })
    }
  }
  selectMethod(event) {
    var value = event.target.name;
    if(value == 'online') {
      this.setState({
        Online: true ^ this.state.Online,
      })
    } else {
      this.setState({
        Offline: true ^ this.state.Offline
      })
    }
  }

  render() {

    var topicTitleClass = classNames({
      'ipt-tips': 'ipt-tips',
      'username': 'username',
      'error': (this.state.topicTitle == 2),
      'right': (this.state.topicTitle == 1),
      'hide': (this.state.topicTitle == 0)
    });

    var priceClass = classNames({
      'ipt-tips': 'ipt-tips',
      'username': 'username',
      'error': (this.state.price == 2),
      'right': (this.state.price == 1),
      'hide': (this.state.price == 0)
    });
    var descClass = classNames({
      'ipt-tips': 'ipt-tips',
      'username': 'username',
      'error': (this.state.descToggle == 2),
      'right': (this.state.descToggle == 1),
      'hide': (this.state.descToggle == 0)
    });

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
                <input type="text" className="frm-ipt " ref="topicName" name="vcode" onChange={this.handleChangeTitle.bind(this)} placeholder="请输入话题名称" />
              </span>
              <span className={topicTitleClass}><i></i><span>话题名称至少为35个字符 {this.topicLengthTips}</span></span>
              <span className="vcode-tips frm-tips"> 一个合适的话题名称可以让你得到更多的推荐</span>
            </div>

            <div className="desc-frm frm-wrap">
              <label  className="frm-label">话题描述</label>
              <span className="frm-ipt-box desc-box spec-box">
                <textarea className="text-desc" rows="5" ref="topicDesc" onChange={this.handleChangeDesc.bind(this)} placeholder="请详情描述你的话题,这将成为审核和点友预约你的依据,不少于50字" ></textarea>
              </span>
              <span className={descClass} > <i></i>还需输入{50 - this.state.descLength}字</span>

            </div>

            <div className="pwd-frm frm-wrap">
              <label  className="frm-label">话题价格</label>
              <span className="frm-ipt-box price">
                <input type="text" className="frm-ipt " onChange={this.handleChangePrice.bind(this)} ref="price" name="price" placeholder="" />
              </span>
              元
              <span className={priceClass}><i></i><span>请输入正确的价格 {this.topicLengthTips}</span></span>
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