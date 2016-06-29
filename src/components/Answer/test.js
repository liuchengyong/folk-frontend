/**
 * wenxin college share
 * @auther liuchengyong
 */
require('normalize.css');
require('styles/_answer.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import Helmet from 'react-helmet';
import config from 'config';
import TopBanner from '../Common/TopBanner';

import QuestionComponent from './Question';
import CommentsComponent from './Comments';

import WechatWrapper from '../WechatWrapper';
// import wx from 'weixin-js-sdk';
import headers from '../../actions/globalHeader';

let logo_icon = require('../../images/icon/logo_icon.png');

class AnswerComponent extends React.Component {
  DownApp() {
      this.props.actions.setDialogStatus(true);
  }

  goPay(){
    let user = this.props.user;
    if(user.isFetching){
        this.props.actions.setDialogStatus(true);
        return;
    }
    this.getPayOrder();
  }
  serialize(data) {
      return Object.keys(data).map(function (keyName) {
          return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
      }).join('&');
  }
  fetchOrderConfig(user,answerId,title){
    var options = {
      openId: user.openid,
      avatar: user.headimgurl,
      loginName: user.nickname,
      account: user.unionid || null,
      gender: user.sex === 1  ? 'MALE' : user.sex === 2 ? 'FEMALE' : 'SECRET',
      answerId: answerId,
      subject: title,
      body: title,
      price: 100
    };
    //config.apiUrl
    return fetch('http://test.zhid58.com:8080' + '/api/v1/fund/order/answer/weixin/h5', {
      method: 'Post',
      headers: headers,
      body:this.serialize(options)
    });
  }

  getPayOrder(){
    this.fetchOrderConfig(this.props.user,this.props.answer.answer.answerId,this.props.answer.answer.question.title)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data = data.param;
      WeixinJSBridge.invoke(
         'getBrandWCPayRequest', {
            appId: data.appid,     //公众号名称，由商户传入 
            nonceStr: data.myNoncestr, //随机串    
            package:'prepay_id=' + data.prepay_id,    
            signType: 'MD5',         //微信签名方式：    
            timestamp:data.myTimestamp,         //时间戳，自1970年以来的秒数       
            paySign: data.mySign //微信签名 
         },
         function(res){ 
             alert(res);    
             if(res.err_msg == 'get_brand_wcpay_request：ok' ) {
                alert("success");
             }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
         }
      ); 


      // wx.chooseWXPay({
      //     appId:data.appid,
      //     timeStamp: data.myTimestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //     nonceStr: data.myNoncestr, // 支付签名随机串，不长于 32 位
      //     package: `prepay_id=${data.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      //     signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //     paySign: data.mySign, // 支付签名
      //     success: function (res) {
      //         alert(res);
      //     }
      // });
    });
    
  }

  render() {
    console.log(this.props);
    let params = this.props.answer;
    if(params.isFetching) {
        return <Loading />;
    }
   
    let dialog = this.props.dialog,
        actions = this.props.actions,
        answer = params.answer,
        comments = this.props.answer.comments,
        commentsDom = null;
    if(comments.totalSize > 0){
        commentsDom = (<CommentsComponent actions={actions} comments={comments} />);
    }

    return (
      <div className="answer-container">
        <Helmet title={ '指点-' + answer.question.title} />
        <TopBanner dialog={dialog} actions={actions} />
        <QuestionComponent question={answer} />
        <div className="answer">
          <div className="answer-header">
              <img className="answer-person-icon" src={answer.answererAvater} />
              <span className="answer-person-name">{answer.answererName}</span>
              <span className="answer-person-major">{answer.answererTitle}</span>
          </div>
          <div className="answer-pay">
              <span onClick={this.goPay.bind(this)}>1元去瞅瞅</span>
          </div>
        </div>
        {commentsDom}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && !nextProps.answer.isFetching) {
        let answer = nextProps.answer.answer;
        nextProps.configWechatSharing({
            title: `【指点】 你的益答 | ${answer.question.title}`,
            desc: answer.answererName + '|' + answer.answererTitle,
            link: `${config.baseUrl}/answer/` + this.props.params.id,
            imgUrl: answer.answererAvater || logo_icon
        });
    }
  }

  componentDidMount() {
      DeviceAdapter.setFrontSize();
      this.props.actions.fetchAnswerData(this.props.params.id);
  }
}

AnswerComponent.defaultProps = {};

export default WechatWrapper(AnswerComponent);